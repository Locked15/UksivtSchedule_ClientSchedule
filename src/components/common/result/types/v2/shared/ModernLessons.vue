<template>
  <v-table>
    <thead>
      <tr>
        <th>Номер</th>
        <th>Название</th>
        <th>Аудитория</th>
        <th class="hidable-item">{{ getLessonTargetTitle(forTeacher) }}</th>
        <th class="hidable-item">Часов</th>
        <th class="text-center hidable-item">Время</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="lesson in lessons" :key="`${resultItemId}-${lesson.lessonNumber}`" :class="getClassesForLessonRowItem(lesson)"
          @click="showInfoAboutLesson(lesson)">
        <td class="non-hidable-item">{{ lesson.lessonNumber }}</td>
        <td class="non-hidable-item">{{ lesson.lessonName }}</td>
        <td class="non-hidable-item">{{ lesson.lessonPlace ?? '—' }}</td>
        <td class="hidable-item">{{ getLessonTargetContent(lesson) ?? '—' }}</td>
        <td class="hidable-item">{{ lesson.lessonHoursPassed ?? '—' }}</td>
        <td class="hidable-item hours-info">
          <div v-for="targetHour in lesson.lessonTargetHours" :key="`${targetHour}-${lesson.lessonNumber}`">{{ targetHour }}</div>
        </td>
      </tr>

      <tr class="data-is-empty" v-if="lessons.length < 1">
        <td class="table-warning-text" :colspan="getColspanForEmptyResultSet()">Пары отсутствуют...</td>
        <td class="table-warning-text" :colspan="getColspanForEmptyResultSet()">... или ...</td>
        <td class="table-warning-text" :colspan="getColspanForEmptyResultSet()">... данные недоступны.</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import Swal from 'sweetalert2';
  import ApplicationData from '@/common/data/ApplicationData';
  import { getModernLessonInfoMessage } from '@/common/utils/helpers/LessonHelper';
  import ModernAPILessonEntitiesParent from '@/models/api/entities/v2/common/ModernAPILessonEntitiesParent';
  import { getLessonSpecifiedTarget } from '@/models/api/entities/v2/common/cast/ModernLessonUtils';
  import ResultMessages from '@/models/common/messages/ResultMessages';

  @Options({
    props: {
      resultItemId: Number,
      forTeacher: Boolean,
      lessons: Array<ModernAPILessonEntitiesParent>,
    },
  })
  export default class ModernLessons extends Vue {
    public resultItemId!: number;

    public forTeacher!: boolean;

    public lessons!: Array<ModernAPILessonEntitiesParent>;

    public declare isScreenNarrow: boolean;

    public beforeMount(): void {
      this.isScreenNarrow = window.innerWidth <= ApplicationData.CLIENT_NARROW_MAX_WIDTH;
    }

    public getColspanForEmptyResultSet(): number {
      return this.isScreenNarrow ? 1 : 2;
    }

    public getLessonTargetTitle = (forTeacher: boolean) => (forTeacher ? 'Группа' : 'Преподаватель');

    public getLessonTargetContent(lesson: ModernAPILessonEntitiesParent): string | null {
      return getLessonSpecifiedTarget(lesson, this.forTeacher);
    }

    public getClassesForLessonRowItem = (lesson: ModernAPILessonEntitiesParent) => (lesson.lessonIsChanged ? 'altered-element' : '');

    public showInfoAboutLesson(lesson: ModernAPILessonEntitiesParent) {
      if (this.isScreenNarrow) {
        const message = getModernLessonInfoMessage(lesson, this.forTeacher);
        Swal.fire(ResultMessages.ModernLessonDetailsMessage.title, message, 'info');
      }
    }
  }
</script>

<style scoped>
  @import '@/../public/css/result/result-item.css';
</style>
