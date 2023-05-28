<template>
  <Transition name="result-fade">
    <div class="result-fade-item">
      <h3>Базовое Расписание</h3>
      <div>
        <h5>Расписание на {{ itemModel.day }}</h5>
        <LegacyLessons :resultItemId="itemModel.day" :lessons="getFilteredLessons()" />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
  import { checkLegacyLessonIsActual } from '@/common/utils/FilterHelper';
  import BasicSchedule from '@/models/api/entities/v1/BasicSchedule';
  import Lesson from '@/models/api/entities/v1/base/Lesson';
  import { Options, Vue } from 'vue-class-component';

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
  @import '@/../public/css/result.css';
</style>
