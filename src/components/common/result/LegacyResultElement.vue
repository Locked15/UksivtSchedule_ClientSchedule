<template>
  <div>
    <!-- Parent container for 'Basic Schedule' result. -->
    <div class="result-item" v-if="modelIsInstanceOfBasicSchedule()">
      <LegacyBasicScheduleResultItem :itemModel="getItemModelForBasicSchedule()" />
    </div>

    <!-- Parent container for 'Schedule Replacements' result. -->
    <div class="result-item" v-else-if="modelIsInstanceOfScheduleReplacement()">
      <LegacyScheduleReplacementResultItem :itemModel="getItemModelForScheduleReplacement()" />
    </div>

    <!-- Parent container for 'Final Schedule' result. -->
    <div class="result-item" v-else>
      <LegacyFinalScheduleResultItem :itemModel="getItemModelForFinalSchedule()" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import BasicSchedule from '@/models/api/entities/v1/BasicSchedule';
  import FinalSchedule from '@/models/api/entities/v1/FinalSchedule';
  import ScheduleReplacement from '@/models/api/entities/v1/ScheduleReplacement';
  import { isFinalSchedule, isScheduleOfDay, isScheduleReplacement } from '@/models/api/entities/v1/common/cast/LegacyEntityCastUtils';
  import LegacyResultElementModel from '@/models/components/common/result/LegacyResultElementModel';
  import LegacyBasicScheduleResultItem from './types/v1/LegacyBasicScheduleResultItem.vue';
  import LegacyScheduleReplacementResultItem from './types/v1/LegacyScheduleReplacementResultItem.vue';
  import LegacyFinalScheduleResultItem from './types/v1/LegacyFinalScheduleResultItem.vue';

  @Options({
    props: {
      model: LegacyResultElementModel,
    },
    components: {
      LegacyBasicScheduleResultItem,
      LegacyScheduleReplacementResultItem,
      LegacyFinalScheduleResultItem,
    },
  })
  export default class LegacyResultElement extends Vue {
    public model!: LegacyResultElementModel;

    public modelIsInstanceOfBasicSchedule(): boolean {
      return isScheduleOfDay(this.model.data);
    }

    public getItemModelForBasicSchedule(): BasicSchedule {
      return this.model.data as BasicSchedule;
    }

    public modelIsInstanceOfScheduleReplacement(): boolean {
      return isScheduleReplacement(this.model.data);
    }

    public getItemModelForScheduleReplacement(): ScheduleReplacement {
      return this.model.data as ScheduleReplacement;
    }

    public modelIsInstanceOfFinalSchedule(): boolean {
      return isFinalSchedule(this.model.data);
    }

    public getItemModelForFinalSchedule(): FinalSchedule {
      return this.model.data as FinalSchedule;
    }
  }
</script>

<style scoped>
  @import '@/../public/css/result/result-component.css';
</style>
