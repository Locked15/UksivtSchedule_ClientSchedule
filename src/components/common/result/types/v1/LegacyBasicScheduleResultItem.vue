<template>
  <div class="result-item-transition-container">
    <hr class="heirloom-hr small-hr" />
    <Transition name="result-fade">
      <v-show>
        <div class="result-fade-item">
          <h3>Базовое Расписание</h3>
          <div class="result-item-component">
            <h5>Расписание на {{ itemModel.day }}</h5>
            <LegacyLessons :resultItemId="itemModel.day" :lessons="getFilteredLessons()" />
          </div>
        </div>
      </v-show>
    </Transition>
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import { checkLegacyLessonIsActual } from '@/common/utils/helpers/FilterHelper';
  import BasicSchedule from '@/models/api/entities/v1/BasicSchedule';
  import Lesson from '@/models/api/entities/v1/base/Lesson';

  import LegacyLessons from './shared/LegacyLessons.vue';

  @Options({
    props: {
      itemModel: BasicSchedule,
    },
    components: {
      LegacyLessons,
    },
  })
  export default class LegacyBasicScheduleResultItem extends Vue {
    public itemModel!: BasicSchedule;

    public getFilteredLessons(): Array<Lesson> {
      return this.itemModel.lessons.filter((lesson) => checkLegacyLessonIsActual(lesson));
    }
  }
</script>

<style scoped>
  @import '@/../public/css/result/result-component.css';
</style>
