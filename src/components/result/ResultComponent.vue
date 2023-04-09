<!-- eslint-disable vue/max-len -->

<template>
  <div>
    <h2 class="header-content result-header">Представление Результатов</h2>
    <div>
      <span class="results-legend">
        <p>Все подчёркнутые и выделенные элементы являются элементами замен.</p>
      </span>
      <div class="result-parent-container">
        <div class="result-container" v-for="result in componentModel.results" :key="`result-${componentModel.results.indexOf(result)}`">
          <!-- Parent container for 'Final Schedule' result. -->
          <div class="result-item" v-if="checkResultIsFinalSchedule(result.value)">
            <hr class="heirloom-hr" />
            <h3 class="header-content">{{ result.value.Schedule.Day }}</h3>
            <hr class="heirloom-hr small-hr" />

            <div class="element-info">
              <span> Дата: {{ getDateLocaleString(result.value.ScheduleDate) || result.value.Schedule.Day }}. </span>
            </div>
            <ResultComponentElement :dayId="result.dayId" :lessons="result.value.Schedule.Lessons" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import FinalScheduleRepository from '@/common/repository/schedule/FinalScheduleRepository';
  import ResultComponentElement from '@/components/result/ResultComponentElement.vue';
  import FinalSchedule from '@/models/entities/FinalSchedule';
  import Day from '@/models/entities/base/Day.js';
  import ResultComponentModel from '@/models/views/ResultComponentModel';
  import { Options, Vue } from 'vue-class-component';

  @Options({
    props: {
      componentModel: ResultComponentModel,
    },
    components: {
      ResultComponentElement,
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
      return FinalSchedule.isFinalSchedule(result);
    }

    // eslint-disable-next-line class-methods-use-this
    public getDateLocaleString(dateObject: Date): string | null {
      if (dateObject != null) {
        // ToDo: Connect library, to work with Date NORMALLY.
        return dateObject.toString();
      }
      return null;
    }
  }
</script>

<style scoped>
  .result-header {
    font-size: 2rem;

    text-align: center;
    margin: 32px;
  }

  .result-header ~ div {
    display: flex;
    flex: auto;
    flex-direction: column;
  }

  .results-legend {
    align-self: center;
  }

  .result-parent-container {
    display: flex;
    flex: auto;
    flex-direction: column;

    padding: 10px;
  }

  .result-parent-container > .result-container {
    display: flex;
    flex: auto;
    flex-direction: column;
    align-items: center;
  }

  .result-parent-container > .result-container > .result-item {
    display: flex;
    flex: auto;
    flex-direction: column;

    width: 65%;
    max-width: 70%;
  }

  .result-item > h3 {
    text-align: center;
  }

  .small-hr {
    width: 45%;
    height: 5px;

    align-self: center;
    margin-top: -3.141px;
  }

  .small-hr::before {
    display: none;
  }

  .element-info {
    text-align: center;
  }
</style>
