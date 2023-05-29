<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Номер</th>
        <th class="text-left">Название</th>
        <th class="text-left">Аудитория</th>
        <th class="text-left hidable-item">{{ getLessonTargetTitle(forTeacher) }}</th>
        <th class="text-left hidable-item">Часов</th>
        <th class="text-left hidable-item" title="На данный момент нереализовано..."><i>Время</i></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="lesson in lessons" :key="`${resultItemId}-${lesson.lessonNumber}`" :class="getClassesForLessonRowItem(lesson)"
          @click="showInfoAboutLesson(lesson)">
        <td class="non-hidable-item">{{ lesson.lessonNumber || '—' }}</td>
        <td class="non-hidable-item">{{ lesson.lessonName || '—' }}</td>
        <td class="non-hidable-item">{{ lesson.lessonPlace || '—' }}</td>
        <td class="hidable-item">{{ getLessonTargetContent(lesson) || '—' }}</td>
        <td class="hidable-item">{{ lesson.lessonHoursPassed || '—' }}</td>
        <td class="hidable-item">🕛 ... 🕧</td>
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
  import ApplicationData from '@/common/data/ApplicationData';
  import ModernAPILessonEntitiesParent from '@/models/api/entities/v2/common/ModernAPILessonEntitiesParent';
  import { getLessonSpecifiedTarget, getPassedLessonsCountInString } from '@/models/api/entities/v2/common/cast/ModernLessonUtils';
  import ResultMessages from '@/models/common/messages/ResultMessages';
  import Swal from 'sweetalert2';
  import { Options, Vue } from 'vue-class-component';

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

    // eslint-disable-next-line class-methods-use-this
    public getLessonTargetTitle = (forTeacher: boolean) => (forTeacher ? 'Группа' : 'Преподаватель');

    public getLessonTargetContent(lesson: ModernAPILessonEntitiesParent): string | null {
      return getLessonSpecifiedTarget(lesson, this.forTeacher);
    }

    // eslint-disable-next-line class-methods-use-this
    public getClassesForLessonRowItem = (lesson: ModernAPILessonEntitiesParent) => (lesson.lessonIsChanged ? 'altered-element' : '');

    public showInfoAboutLesson(lesson: ModernAPILessonEntitiesParent) {
      if (this.isScreenNarrow) {
        const message = ResultMessages.ModernLessonDetailsMessage.message
          .replace('{0}', this.getLessonTargetContent(lesson) || '[N/A]')
          .replace('{1}', lesson.lessonHoursPassed?.toString() || '[N/A]')
          .replace('{2}', getPassedLessonsCountInString(lesson));
        Swal.fire(ResultMessages.ModernLessonDetailsMessage.title, message, 'info');
      }
    }
  }
</script>

<style scoped>
  @import '@/../public/css/result/result-item.css';
</style>
