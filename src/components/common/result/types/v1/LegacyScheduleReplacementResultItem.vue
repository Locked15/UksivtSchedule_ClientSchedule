<template>
  <Transition name="result-fade">
    <div class="result-fade-item">
      <h3>Замена для Расписания</h3>
      <div>
        <h5>Расписание на {{ getStringTitleForReplacementModel() }}</h5>
        <LegacyLessons :resultItemId="itemModel.changesDate" :lessons="itemModel.newLessons" />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
  import DateWorker from '@/common/utils/DateWorker';
  import ScheduleReplacement from '@/models/api/entities/v1/ScheduleReplacement';
  import { Options, Vue } from 'vue-class-component';

  import LegacyLessons from './shared/LegacyLessons.vue';

  @Options({
    props: {
      itemModel: ScheduleReplacement,
    },
    components: {
      LegacyLessons,
    },
  })
  export default class LegacyScheduleReplacementResultItem extends Vue {
    public itemModel!: ScheduleReplacement;

    public getStringTitleForReplacementModel(): string {
      return DateWorker.getDateTitleString(this.itemModel.changesDate);
    }
  }
</script>

<style scoped>
  @import '@/../public/css/result.css';
</style>
