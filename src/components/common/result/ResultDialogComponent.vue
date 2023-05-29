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
          <!-- Parent for all Legacy Results. -->
          <div v-if="isInstanceOfLegacyEntity(result.value)">
            <LegacyResultElement :model="getLegacyResultModelForElement(result.value)" />
          </div>

          <!-- Parent for all Modern Results. -->
          <div v-else-if="isInstanceOfModernEntity(result.value)">
            <ModernResultElement :model="getModernResultModelForElement(result.value)" />
          </div>

          <!-- Parent for all Unsupported Types. -->
          <div v-else>
            <p>Unsupported type of Model...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- eslint-disable vue/max-len -->
<!-- eslint-disable class-methods-use-this -->
<script lang="ts">
  import ILegacyScheduleRepository from '@/common/repository/base/ILegacyScheduleRepository';
  import IModernScheduleRepository from '@/common/repository/base/IModernScheduleRepository';
  import IScheduleRepository from '@/common/repository/base/IScheduleAPIRepository';
  import LegacyBasicScheduleRepository from '@/common/repository/v1/schedule/BasicScheduleRepository';
  import LegacyFinalScheduleRepository from '@/common/repository/v1/schedule/FinalScheduleRepository';
  import LegacyScheduleReplacementRepository from '@/common/repository/v1/schedule/ScheduleReplacementRepository';
  import ModernBasicScheduleRepository from '@/common/repository/v2/schedule/BasicScheduleRepository';
  import ModernFinalScheduleRepository from '@/common/repository/v2/schedule/FinalScheduleRepository';
  import ModernScheduleReplacementRepository from '@/common/repository/v2/schedule/ScheduleReplacementRepository';
  import DateWorker from '@/common/utils/DateWorker';
  import LegacyResultElement from '@/components/common/result/LegacyResultElement.vue';
  import IEntityParent from '@/models/api/entities/base/IEntityParent';
  import LegacyAPIEntitiesParent from '@/models/api/entities/v1/common/LegacyAPIEntitiesParent';
  import { isInstanceOfLegacyEntity } from '@/models/api/entities/v1/common/LegacyEntityCastUtils';
  import ModernAPIEntitiesParent from '@/models/api/entities/v2/common/ModernAPIEntitiesParent';
  import { isInstanceOfModernEntity } from '@/models/api/entities/v2/common/cast/ModernEntityCastUtils';
  import SelectableInformation from '@/models/common/user/SelectableInformation';
  import LegacyResultElementModel from '@/models/components/common/result/LegacyResultElementModel';
  import ModernResultElementModel from '@/models/components/common/result/ModernResultElementModel';
  import ResultDialogComponentModel from '@/models/components/common/result/ResultDialogComponentModel';
  import { Options, Vue } from 'vue-class-component';

  import ModernResultElement from './ModernResultElement.vue';

  @Options({
    props: {
      componentModel: ResultDialogComponentModel,
    },
    components: {
      LegacyResultElement,
      ModernResultElement,
    },
  })
  export default class ResultDialogComponent extends Vue {
    public componentModel!: ResultDialogComponentModel;

    public beforeMount() {
      const { target } = this.componentModel;
      const { useDBAsSource } = this.componentModel.userSettings;
      const { selectionByTeachers } = this.componentModel;

      const repo = this.createRepoByCurrentModel();
      if (useDBAsSource) this.beginModernResultsInit(target, selectionByTeachers, repo as IModernScheduleRepository<ModernAPIEntitiesParent, ModernAPIEntitiesParent>);
      else this.beginLegacyResultsInit(target, repo as ILegacyScheduleRepository<LegacyAPIEntitiesParent>);
    }

    private createRepoByCurrentModel(): IScheduleRepository {
      const { useStableAPIBranch } = this.componentModel.userSettings;
      const { useDBAsSource } = this.componentModel.userSettings;
      const { id } = this.componentModel.selectionType;

      return useDBAsSource
        ? ResultDialogComponent.createRepoForDbSource(id, useStableAPIBranch)
        : ResultDialogComponent.createRepoForLegacySource(id, useStableAPIBranch);
    }

    private static createRepoForDbSource(selectableDataId: number, useStableBranch: boolean): IModernScheduleRepository<ModernAPIEntitiesParent, ModernAPIEntitiesParent> {
      if (selectableDataId === SelectableInformation.BASIC_SCHEDULE.id) {
        return new ModernBasicScheduleRepository(useStableBranch);
      }
      if (selectableDataId === SelectableInformation.SCHEDULE_REPLACEMENTS.id) {
        return new ModernScheduleReplacementRepository(useStableBranch);
      }
      return new ModernFinalScheduleRepository(useStableBranch);
    }

    private static createRepoForLegacySource(selectableDataId: number, useStableBranch: boolean): ILegacyScheduleRepository<LegacyAPIEntitiesParent> {
      if (selectableDataId === SelectableInformation.BASIC_SCHEDULE.id) {
        return new LegacyBasicScheduleRepository(useStableBranch);
      }
      if (selectableDataId === SelectableInformation.SCHEDULE_REPLACEMENTS.id) {
        return new LegacyScheduleReplacementRepository(useStableBranch);
      }
      return new LegacyFinalScheduleRepository(useStableBranch);
    }

    private beginModernResultsInit(target: string, selectByTeachers: boolean, repo: IModernScheduleRepository<ModernAPIEntitiesParent, ModernAPIEntitiesParent>) {
      this.componentModel.targetDates.forEach(async (day: Date) => {
        const dayIndex = DateWorker.getNormalizedDayOfWeek(day);
        const resultPromise = selectByTeachers
          ? repo.getDataFromAPIForTeacher(parseInt(target, 10), day, 1)
          : repo.getDataFromAPIForGroup(target, day, 1);

        resultPromise.then((result: ModernAPIEntitiesParent) => {
          this.updateResultsArray(dayIndex, result);
          this.$forceUpdate();
        });
      });
    }

    private beginLegacyResultsInit(target: string, repo: ILegacyScheduleRepository<LegacyAPIEntitiesParent>) {
      this.componentModel.targetDates.forEach(async (day: Date) => {
        const index = DateWorker.getNormalizedDayOfWeek(day);
        repo.getDataFromAPI(index, target, 1).then((result: LegacyAPIEntitiesParent) => {
          this.updateResultsArray(index, result);
          this.$forceUpdate();
        });
      });
    }

    private updateResultsArray(dayIndex: number, newItem: IEntityParent) {
      this.componentModel.results.push({
        dayId: dayIndex,
        value: newItem,
      });
      this.componentModel.results.sort((a, b) => {
        if (a.dayId > b.dayId) return 1;
        if (a.dayId < b.dayId) return -1;
        return 0;
      });
    }

    public isInstanceOfLegacyEntity = (object: any) => isInstanceOfLegacyEntity(object);

    public getLegacyResultModelForElement = (modelData: LegacyAPIEntitiesParent) => new LegacyResultElementModel(modelData);

    public isInstanceOfModernEntity = (object: any) => isInstanceOfModernEntity(object);

    public getModernResultModelForElement = (modelData: ModernAPIEntitiesParent) => new ModernResultElementModel(modelData);
  }
</script>

<style scoped>
  @import "@/../public/css/result/result-parent.css";
</style>
