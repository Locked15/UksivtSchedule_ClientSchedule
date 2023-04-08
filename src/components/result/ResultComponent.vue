<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div>
    <h2 class="header-content">Представление Результатов</h2>
    <div v-for="result in componentModel.results" :key="`result-${componentModel.results.indexOf(result)}`">
      <!-- Parent container for 'Final Schedule' result. -->
      <div>
        <a>Is Final Schedule.</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import FinalScheduleRepository from '@/common/repository/schedule/FinalScheduleRepository';
  import Day from '@/models/entities/Day';
  import FinalSchedule from '@/models/entities/FinalSchedule';
  import ResultComponentModel from '@/models/views/ResultComponentModel';
  import { Options, Vue } from 'vue-class-component';

  @Options({
    props: {
      componentModel: ResultComponentModel,
    },
  })
  export default class ResultComponent extends Vue {
    public componentModel!: ResultComponentModel;

    public beforeMount() {
      const target = this.componentModel.targetGroup;
      const useDb = this.componentModel.userSettings.useDBAsSource;
      const useStableAPI = this.componentModel.userSettings.useStableAPIBranch;

      const repo = new FinalScheduleRepository(useDb, useStableAPI);
      this.componentModel.selectableDays.forEach(async (day: Day) => {
        const item = await repo.getFinalScheduleFromAPI(day.index, target, 1);
        this.updateResultsArray(day.index, item);

        this.$forceUpdate();
      });
    }

    private updateResultsArray(dayIndex: number, newItem: any) {
      this.componentModel.results.push({
        dayId: dayIndex,
        value: newItem,
      });
      this.componentModel.results.sort((a, b) => {
        if (a.dayId > b.dayId) {
          return 1;
        }
        if (a.dayId < b.dayId) {
          return -1;
        }

        return 0;
      });
    }

    public getCompletionProgress(): number {
      return this.componentModel.results.length / this.componentModel.selectableDays.length;
    }

    // eslint-disable-next-line class-methods-use-this
    public checkResultIsFinalSchedule(result: any): result is FinalSchedule {
      const res = result instanceof FinalSchedule;
      return res;
    }
  }
</script>

<style scoped></style>
