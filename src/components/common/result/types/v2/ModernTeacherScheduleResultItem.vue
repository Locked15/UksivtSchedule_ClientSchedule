<template>
  <div class="result-item-transition-container">
    <hr class="heirloom-hr small-hr" />
    <Transition name="result-fade">
      <v-show>
        <div class="result-fade-item">
          <h3>Расписание для Преподавателя</h3>
          <div class="result-item-component">
            <h5>Расписание на {{ getDateTitle() }}</h5>
            <ModernLessons :resultItemid="getResultItemId()" :forTeacher="true" :lessons="itemModel.lessonsInfo" />
          </div>

          <div>
            <div class="result-info-message" v-if="!itemModel.replacementsForDateIsAvailable">
              <p class="error-message">Внимание: Целевые данные для указанной даты не обнаружены!</p>
            </div>
            <div class="result-info-message" v-else-if="!getCurrentScheduleReplacementsActuality()">
              <p class="warning-message">Внимание: Данные о заменах пар для указанного преподавателя не обнаружены.</p>
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
  import TeacherScheduleWrapper from '@/models/api/entities/v2/wrappers/TeacherScheduleWrapper';

  import ModernLessons from './shared/ModernLessons.vue';

  @Options({
    props: {
      itemModel: TeacherScheduleWrapper,
    },
    components: {
      ModernLessons,
    },
  })
  export default class ModernTeacherScheduleResultItem extends Vue {
    public itemModel!: TeacherScheduleWrapper;

    public getDateTitle(): string {
      return DateWorker.getNamedDateTitleString(this.itemModel.targetDate);
    }

    public getResultItemId(): number {
      return DateWorker.getFullTime(this.itemModel.targetDate);
    }

    public getCurrentScheduleReplacementsActuality(): boolean {
      return this.itemModel.lessonsInfo.filter((lesson) => lesson.lessonIsChanged).length > 0;
    }
  }
</script>

<style scoped></style>
