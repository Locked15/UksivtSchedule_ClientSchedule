<template>
  <div>
    <h1>Выборка Результата</h1>
    <div><h3>{{ viewModel.groupName }}</h3></div>
  </div>
</template>

<script lang="ts">
  import { LATEST_SEARCH_TARGET } from '@/common/keys';
  import { Options, Vue } from 'vue-class-component';
  import ResultSelectionModel from '@/models/views/ResultSelectionModel';
  import Swal from 'sweetalert2';

  @Options({
    components: {},
  })

  export default class ResultView extends Vue {
    viewModel = ResultSelectionModel.getDefaultModel();

    public async beforeMount() {
      let target = localStorage.getItem(LATEST_SEARCH_TARGET);
      if (!target || target == null || target === '') {
        Swal.fire();
        target = ResultSelectionModel.defaultGroupName;
      }

      this.viewModel.groupName = target;
    }
  }
</script>

<style scoped></style>
