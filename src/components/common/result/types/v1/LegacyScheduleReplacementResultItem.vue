<template>
  <div class="result-item-transition-container">
    <hr class="heirloom-hr small-hr" />
    <Transition name="result-fade">
      <div class="result-fade-item">
        <h3>Замена для Расписания</h3>
        <div class="result-item-component">
          <h5>Замены на {{ getStringTitleForReplacementModel() }}</h5>
          <LegacyLessons :resultItemId="itemModel.changesDate" :lessons="itemModel.newLessons" />
        </div>

        <div>
          <div class="result-info-message" v-if="!itemModel.changesFound">
            <p class="error-message">Внимание: Замены для указанной даты не обнаружены.</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
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
      return DateWorker.getNamedDateTitleString(this.itemModel.changesDate);
    }
  }
</script>

<style scoped>
  @import '@/../public/css/result/result-component.css';
</style>
