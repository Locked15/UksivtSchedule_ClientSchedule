<template>
  <div>
    <!-- Parent for Teacher-Based Schedules. -->
    <div v-if="modelIsInstanceOfTeacherSchedule(model.data)">
      <div class="result-item">
        <p>Teacher Schedule!</p>
      </div>
    </div>

    <!-- Parent for Group-Based Schedules. -->
    <div v-else>
      <!-- Parent container for 'Basic Schedule' result. -->
      <div class="result-item" v-if="modelIsInstanceOfBasicSchedule(model.data)">
        <p>Group Basic Schedule!</p>
      </div>

      <!-- Parent container for 'Schedule Replacement' result. -->
      <div class="result-item" v-else-if="modelIsInstanceOfScheduleReplacement(model.data)">
        <p>Group Replacement Data!</p>
      </div>

      <!-- Parent container for 'Final Schedule' result. -->
      <div class="result-item" v-else>
        <p>Group Final Schedule!</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import ModernAPIEntitiesParent from '@/models/api/entities/v2/common/ModernAPIEntitiesParent';
  import {
    isInstanceOfGroupBasicScheduleWrapper,
    isInstanceOfGroupFinalScheduleWrapper,
    isInstanceOfGroupScheduleReplacementWrapper,
    isInstanceOfTeacherScheduleWrapper,
  } from '@/models/api/entities/v2/common/ModernEntityCastUtils';
  import ModernResultElementModel from '@/models/components/common/result/ModernResultElementModel';
  import { Options, Vue } from 'vue-class-component';

  @Options({
    props: {
      model: ModernResultElementModel,
    },
  })
  export default class ModernResultElement extends Vue {
    public model!: ModernResultElementModel;

    // eslint-disable-next-line class-methods-use-this
    public modelIsInstanceOfBasicSchedule = (obj: ModernAPIEntitiesParent) => isInstanceOfGroupBasicScheduleWrapper(obj);

    // eslint-disable-next-line class-methods-use-this, vue/max-len
    public modelIsInstanceOfScheduleReplacement = (obj: ModernAPIEntitiesParent) => isInstanceOfGroupScheduleReplacementWrapper(obj);

    // eslint-disable-next-line class-methods-use-this
    public modelIsInstanceOfFinalSchedule = (obj: ModernAPIEntitiesParent) => isInstanceOfGroupFinalScheduleWrapper(obj);

    // eslint-disable-next-line class-methods-use-this
    public modelIsInstanceOfTeacherSchedule = (obj: ModernAPIEntitiesParent) => isInstanceOfTeacherScheduleWrapper(obj);
  }
</script>

<style>
  @import '@/../public/css/result.css';
</style>
