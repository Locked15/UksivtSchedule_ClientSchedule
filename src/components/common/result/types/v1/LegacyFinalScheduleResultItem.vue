<template>
  <div class="result-item-transition-container">
    <hr class="heirloom-hr small-hr" />
    <Transition name="result-fade">
      <v-show>
        <div class="result-fade-item">
          <h3>Итоговое Расписание</h3>
          <div class="result-item-component">
            <h5>Расписание на {{ getDateTitle() }}</h5>
            <LegacyLessons :resultItemId="itemModel.schedule.day" :lessons="getFilteredLessons()" />
          </div>

          <div>
            <div class="result-info-message" v-if="!itemModel.changesFound">
              <p class="warning-message">Внимание: Данные замен для указанной даты не обнаружены!</p>
            </div>
            <div class="result-info-message" v-else-if="!itemModel.actualChanges">
              <p class="error-message">Внимание: Замены для указанной группы не обнаружены.</p>
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
  import { checkLegacyLessonIsActual } from '@/common/utils/helpers/FilterHelper';
  import FinalSchedule from '@/models/api/entities/v1/FinalSchedule';
  import Lesson from '@/models/api/entities/v1/base/Lesson';

  import LegacyLessons from './shared/LegacyLessons.vue';

  @Options({
    props: {
      itemModel: FinalSchedule,
    },
    components: {
      LegacyLessons,
    },
  })
  export default class LegacyFinalScheduleResultItem extends Vue {
    public itemModel!: FinalSchedule;

    public getDateTitle(): string {
      if (this.itemModel.scheduleDate != null) {
        return DateWorker.getNamedDateTitleString(this.itemModel.scheduleDate);
      }
      return this.itemModel.schedule.day;
    }

    public getFilteredLessons(): Array<Lesson> {
      return this.itemModel.schedule.lessons.filter((lesson) => checkLegacyLessonIsActual(lesson));
    }
  }
</script>

<style>
  @import '@/../public/css/result/result-component.css';
</style>
