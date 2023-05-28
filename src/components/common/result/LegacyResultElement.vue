<template>
  <div>
    <!-- Parent container for 'Basic Schedule' result. -->
    <div class="result-item" v-if="modelIsInstanceOfBasicSchedule(model.data)">
      <p>This is Basic Schedule.</p>
    </div>

    <!-- Parent container for 'Schedule Replacements' result. -->
    <div class="result-item" v-else-if="modelIsInstanceOfScheduleReplacement(model.data)">
      <p>This is Schedule Replacement.</p>
    </div>

    <!-- Parent container for 'Final Schedule' result. -->
    <div class="result-item" v-else>
      <p>This is Final Schedule.</p>
    </div>
  </div>
</template>

<script lang="ts">
  import LegacyAPIEntitiesParent from '@/models/api/entities/v1/common/LegacyAPIEntitiesParent';
  import { isFinalSchedule, isScheduleOfDay, isScheduleReplacement } from '@/models/api/entities/v1/common/LegacyEntityCastUtils';
  import LegacyResultElementModel from '@/models/components/common/result/LegacyResultElementModel';
  import { Options, Vue } from 'vue-class-component';

  @Options({
    props: {
      model: LegacyResultElementModel,
    },
  })
  export default class LegacyResultElement extends Vue {
    public model!: LegacyResultElementModel;

    // eslint-disable-next-line class-methods-use-this
    public modelIsInstanceOfBasicSchedule = (obj: LegacyAPIEntitiesParent) => isScheduleOfDay(obj);

    // eslint-disable-next-line class-methods-use-this, vue/max-len
    public modelIsInstanceOfScheduleReplacement = (obj: LegacyAPIEntitiesParent) => isScheduleReplacement(obj);

    // eslint-disable-next-line class-methods-use-this
    public modelIsInstanceOfFinalSchedule = (obj: LegacyAPIEntitiesParent) => isFinalSchedule(obj);
  }
</script>

<style scoped>
  @import '@/../public/css/result.css';
</style>
