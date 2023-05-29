<template>
  <div>
    <!-- Parent for Teacher-Based Schedules. -->
    <div v-if="modelIsInstanceOfTeacherSchedule()">
      <div class="result-item">
        <ModernTeacherScheduleResultItem :itemModel="getItemModelForTeacherSchedule()" />
      </div>
    </div>

    <!-- Parent for Group-Based Schedules. -->
    <div v-else>
      <!-- Parent container for 'Basic Schedule' result. -->
      <div class="result-item" v-if="modelIsInstanceOfBasicSchedule()">
        <ModernBasicScheduleResultItem :itemModel="getItemModelForBasicSchedule()" />
      </div>

      <!-- Parent container for 'Schedule Replacement' result. -->
      <div class="result-item" v-else-if="modelIsInstanceOfScheduleReplacement()">
        <ModernScheduleReplacementResultItem :itemModel="getItemModelForScheduleReplacement()" />
      </div>

      <!-- Parent container for 'Final Schedule' result. -->
      <div class="result-item" v-else>
        <ModernFinalScheduleResultItem :itemModel="getItemModelForFinalSchedule()" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    isInstanceOfGroupBasicScheduleWrapper,
    isInstanceOfGroupFinalScheduleWrapper,
    isInstanceOfGroupScheduleReplacementWrapper,
    isInstanceOfTeacherScheduleWrapper,
  } from '@/models/api/entities/v2/common/cast/ModernEntityCastUtils';
  import TeacherScheduleWrapper from '@/models/api/entities/v2/wrappers/TeacherScheduleWrapper';
  import GroupBasicScheduleWrapper from '@/models/api/entities/v2/wrappers/group/GroupBasicScheduleWrapper';
  import GroupFinalScheduleWrapper from '@/models/api/entities/v2/wrappers/group/GroupFinalScheduleWrapper';
  import GroupScheduleReplacementWrapper from '@/models/api/entities/v2/wrappers/group/GroupScheduleReplacementWrapper';
  import ModernResultElementModel from '@/models/components/common/result/ModernResultElementModel';
  import { Options, Vue } from 'vue-class-component';
  import ModernFinalScheduleResultItem from './types/v2/ModernFinalScheduleResultItem.vue';
  import ModernBasicScheduleResultItem from './types/v2/ModernBasicScheduleResultItem.vue';
  import ModernScheduleReplacementResultItem from './types/v2/ModernScheduleReplacementResultItem.vue';
  import ModernTeacherScheduleResultItem from './types/v2/ModernTeacherScheduleResultItem.vue';

  @Options({
    props: {
      model: ModernResultElementModel,
    },
    components: {
      ModernBasicScheduleResultItem,
      ModernScheduleReplacementResultItem,
      ModernFinalScheduleResultItem,
      ModernTeacherScheduleResultItem,
    },
  })
  export default class ModernResultElement extends Vue {
    public model!: ModernResultElementModel;

    public modelIsInstanceOfBasicSchedule(): boolean {
      return isInstanceOfGroupBasicScheduleWrapper(this.model.data);
    }

    public getItemModelForBasicSchedule(): GroupBasicScheduleWrapper {
      return this.model.data as GroupBasicScheduleWrapper;
    }

    public modelIsInstanceOfScheduleReplacement(): boolean {
      return isInstanceOfGroupScheduleReplacementWrapper(this.model.data);
    }

    public getItemModelForScheduleReplacement(): GroupScheduleReplacementWrapper {
      return this.model.data as GroupScheduleReplacementWrapper;
    }

    public modelIsInstanceOfFinalSchedule(): boolean {
      return isInstanceOfGroupFinalScheduleWrapper(this.model.data);
    }

    public getItemModelForFinalSchedule(): GroupFinalScheduleWrapper {
      return this.model.data as GroupFinalScheduleWrapper;
    }

    public modelIsInstanceOfTeacherSchedule(): boolean {
      return isInstanceOfTeacherScheduleWrapper(this.model.data);
    }

    public getItemModelForTeacherSchedule(): TeacherScheduleWrapper {
      return this.model.data as TeacherScheduleWrapper;
    }
  }
</script>

<style>
  @import '@/../public/css/result/result-component.css';
</style>
