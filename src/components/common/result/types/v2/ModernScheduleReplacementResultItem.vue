<template>
  <div class="result-item-transition-container">
    <hr class="heirloom-hr small-hr" />
    <Transition name="result-fade">
      <div class="result-fade-item">
        <h3>Замены для Расписания</h3>
        <div class="result-type-title">
          <h5>Замены на {{ getDateTitle() }}</h5>
          <ModernLessons :resultItemId="getResultItemId()" :forTeacher="false" :lessons="itemModel.lessonsInfo" />
        </div>

        <div>
          <div class="result-info-message" v-if="!itemModel.replacementsForDateIsAvailable">
            <p class="error-message">Внимание: Данные для указанной даты не обнаружены!</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
  import DateWorker from '@/common/utils/DateWorker';
  import GroupScheduleReplacementWrapper from '@/models/api/entities/v2/wrappers/group/GroupScheduleReplacementWrapper';
  import { Options, Vue } from 'vue-class-component';

  import ModernLessons from './shared/ModernLessons.vue';

  @Options({
    props: {
      itemModel: GroupScheduleReplacementWrapper,
    },
    components: {
      ModernLessons,
    },
  })
  export default class ModernScheduleReplacementResultItem extends Vue {
    public itemModel!: GroupScheduleReplacementWrapper;

    public getDateTitle(): string {
      return DateWorker.getDateTitleString(this.itemModel.targetDate);
    }

    public getResultItemId(): number {
      if (this.itemModel.scheduleReplacement != null) {
        return this.itemModel.scheduleReplacement.id;
      }
      return -1;
    }
  }
</script>

<style scoped>
  @import '@/../public/css/result/result-component.css';
</style>
