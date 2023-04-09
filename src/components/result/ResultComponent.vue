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
          <!-- Parent container for 'Basic Schedule' result. -->
          <div class="result-item" v-if="checkResultIsInstanceOfBasicSchedule(result.value)">
            <hr class="heirloom-hr" />
            <h3 class="header-content">{{ getDayTitleByDayId(result.dayId).name }}</h3>

            <hr class="heirloom-hr small-hr" />
            <div class="element-info">
              <span>Представлено базовое расписание для указанной группы.</span>
            </div>
            <ResultElement :dayId="result.dayId" :lessons="result.value.Lessons" />
          </div>

          <!-- Parent container for 'Schedule Replacements' result. -->
          <div class="result-item" v-if="checkResultIsInstanceOfScheduleReplacements(result.value)">
            <hr class="heirloom-hr" />
            <h3 class="header-content">{{ getDayTitleByDayId(result.dayId).name }}</h3>

            <hr class="heirloom-hr small-hr" />
            <div class="element-info">
              <span>Замены для: {{ getDateLocaleString(result.value.ChangesDate) || '[N/A]' }}.</span>
              <span v-if="result.value.AbsoluteChanges">Замены на весь день.</span>
            </div>
            <ResultElement :dayId="result.dayId" :lessons="result.value.NewLessons" />
          </div>

          <!-- Parent container for 'Final Schedule' result. -->
          <div class="result-item" v-if="checkResultIsInstanceOfFinalSchedule(result.value)">
            <hr class="heirloom-hr" />
            <h3 class="header-content">{{ getDayTitleByDayId(result.dayId).name }}</h3>

            <hr class="heirloom-hr small-hr" />
            <div class="element-info">
              <span> Дата: {{ getDateLocaleString(result.value.ScheduleDate) || result.value.Schedule.Day }}. </span>
            </div>
            <ResultElement :dayId="result.dayId" :lessons="result.value.Schedule.Lessons" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import ScheduleRepository from '@/common/repository/base/ScheduleRepository';
  import BasicScheduleRepository from '@/common/repository/schedule/BasicScheduleRepository';
  import FinalScheduleRepository from '@/common/repository/schedule/FinalScheduleRepository';
  import ScheduleReplacementRepository from '@/common/repository/schedule/ScheduleReplacementRepository';
  import ResultElement from '@/components/result/ResultElement.vue';
  import FinalSchedule from '@/models/entities/FinalSchedule';
  import ScheduleReplacement from '@/models/entities/ScheduleReplacement';
  import Day from '@/models/entities/base/Day';
  import ScheduleOfDay from '@/models/entities/ScheduleOfDay';
  import SelectableInformation from '@/models/user/SelectableInformation';
  import ResultComponentModel from '@/models/views/ResultComponentModel';
  import { Options, Vue } from 'vue-class-component';

  @Options({
    props: {
      componentModel: ResultComponentModel,
    },
    components: {
      ResultElement,
    },
  })
  export default class ResultComponent extends Vue {
    public componentModel!: ResultComponentModel;

    public beforeMount() {
      const target = this.componentModel.targetGroup;
      const useDb = this.componentModel.userSettings.useDBAsSource;
      const useStableAPI = this.componentModel.userSettings.useStableAPIBranch;

      const repo = this.createRepoForCurrentSelectableInformation(useDb, useStableAPI);
      this.beginResultsInit(target, repo);
    }

    // eslint-disable-next-line vue/max-len
    private createRepoForCurrentSelectableInformation(useDb: boolean, useStableAPIBranch: boolean): ScheduleRepository<any> {
      if (this.componentModel.selectionType.id === SelectableInformation.BASIC_SCHEDULE.id) {
        return new BasicScheduleRepository(useDb, useStableAPIBranch);
      }
      if (this.componentModel.selectionType.id === SelectableInformation.SCHEDULE_REPLACEMENTS.id) {
        return new ScheduleReplacementRepository(useDb, useStableAPIBranch);
      }

      return new FinalScheduleRepository(useDb, useStableAPIBranch);
    }

    private beginResultsInit(target: string, repo: ScheduleRepository<any>) {
      this.componentModel.selectableDays.forEach(async (day: Day) => {
        repo.getDataFromAPI(day.index, target, 1).then((result: any) => {
          this.updateResultsArray(day.index, result);
          this.$forceUpdate();
        });
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
    public checkResultIsInstanceOfBasicSchedule(result: any): result is ScheduleOfDay {
      return ScheduleOfDay.isScheduleOfDay(result);
    }

    // eslint-disable-next-line class-methods-use-this
    public checkResultIsInstanceOfScheduleReplacements(result: any): result is ScheduleReplacement {
      return ScheduleReplacement.isScheduleReplacement(result);
    }

    // eslint-disable-next-line class-methods-use-this
    public checkResultIsInstanceOfFinalSchedule(result: any): result is FinalSchedule {
      return FinalSchedule.isFinalSchedule(result);
    }

    // eslint-disable-next-line class-methods-use-this
    public getDayTitleByDayId(dayId: number): Day {
      return Day.getDayFromIndex(dayId);
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

  .results-legend > p {
    text-align: center;
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

  @media (max-width: 641px) {
    .result-parent-container > .result-container > .result-item {
      width: 85%;
      max-width: 90%;
    }
  }

  @media (max-width: 481px) {
    .result-parent-container > .result-container > .result-item {
      width: 95%;
      max-width: 100%;
    }
  }
</style>
