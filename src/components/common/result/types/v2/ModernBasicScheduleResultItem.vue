<template>
  <div class="result-item-transition-container">
    <hr class="heirloom-hr small-hr" />
    <Transition name="result-fade">
      <div class="result-fade-item">
        <h3>Базовое Расписание</h3>
        <div class="result-item-component">
          <h5>Расписание на {{ getDateTitle() }}</h5>
          <ModernLessons :resultItemId="getResultItemId()" :forTeacher="false" :lessons="itemModel.lessonsInfo" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
  import DateWorker from '@/common/utils/workers/DateWorker';
  import GroupBasicScheduleWrapper from '@/models/api/entities/v2/wrappers/group/GroupBasicScheduleWrapper';
  import { Options, Vue } from 'vue-class-component';

  import ModernLessons from './shared/ModernLessons.vue';

  @Options({
    props: {
      itemModel: GroupBasicScheduleWrapper,
    },
    components: {
      ModernLessons,
    },
  })
  export default class ModernBasicScheduleResultItem extends Vue {
    public itemModel!: GroupBasicScheduleWrapper;

    public getDateTitle(): string {
      return DateWorker.getNamedDateTitleString(this.itemModel.targetDate);
    }

    public getResultItemId(): number {
      if (this.itemModel.basicSchedule != null) {
        return this.itemModel.basicSchedule.id;
      }
      return -1;
    }
  }
</script>

<style scoped>
  @import '@/../public/css/result/result-component.css';
</style>
