<template>
  <div class="result-item-transition-container">
    <hr class="heirloom-hr small-hr" />
    <Transition name="result-fade">
      <v-show>
        <div class="result-fade-item">
          <h3>Итоговое Расписание</h3>
          <div class="result-item-component">
            <h5>Расписание на {{ getDateTitle() }}</h5>
            <ModernLessons :resultItemId="getResultItemId()" :forTeacher="false" :lessons="itemModel.lessonsInfo" />
          </div>

          <div>
            <div class="result-info-message" v-if="!itemModel.finalSchedulesForDateIsAvailable">
              <p class="error-message">Внимание: Данные для указанной даты не обнаружены!</p>
            </div>
            <div class="result-info-message" v-else-if="!getCurrentScheduleReplacementsActuality()">
              <p class="warning-message">Внимание: Данные о заменах для указанной группы не обнаружены.</p>
            </div>
          </div>
        </div>
      </v-show>
    </Transition>
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import DateWorker from '@/common/utils/workers/DateWorker';
  import GroupFinalScheduleWrapper from '@/models/api/entities/v2/wrappers/group/GroupFinalScheduleWrapper';

  import ModernLessons from './shared/ModernLessons.vue';

  @Options({
    props: {
      itemModel: GroupFinalScheduleWrapper,
    },
    components: {
      ModernLessons,
    },
  })
  export default class ModernFinalScheduleResultItem extends Vue {
    public itemModel!: GroupFinalScheduleWrapper;

    public getCurrentScheduleReplacementsActuality(): boolean {
      return this.itemModel.lessonsInfo.filter((lesson) => lesson.lessonIsChanged).length > 0;
    }

    public getDateTitle(): string {
      return DateWorker.getNamedDateTitleString(this.itemModel.targetDate);
    }

    public getResultItemId(): number {
      if (this.itemModel.finalSchedule != null) {
        return this.itemModel.finalSchedule.id;
      }
      return -1;
    }
  }
</script>

<style scoped>
  @import '@/../public/css/result/result-component.css';
</style>
