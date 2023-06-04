<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Номер</th>
        <th class="text-left">Название</th>
        <th class="text-left">Преподаватель</th>
        <th class="text-left hidable-item">Аудитория</th>
        <th class="text-left hidable-item" title="На данный момент нереализовано..."><i>Время</i></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="lesson in lessons" :key="`${resultItemId}-${lesson.number}`" :class="getClassesForLessonRowItem(lesson)"
          @click="showInfoAboutLesson(lesson)">
        <td class="non-hidable-item">{{ lesson.number }}</td>
        <td class="non-hidable-item">{{ lesson.name }}</td>
        <td class="non-hidable-item">{{ lesson.teacher || '—' }}</td>
        <td class="hidable-item">{{ lesson.place || '—' }}</td>
        <td class="hidable-item">🕛 ... 🕧</td>
      </tr>

      <tr class="data-is-empty" v-if="lessons.length < 1">
        <td class="table-warning-text" :colspan="getColspanForEmptyResultSet()">Пары отсутствуют...</td>
        <td class="table-warning-text">... или ...</td>
        <td class="table-warning-text" :colspan="getColspanForEmptyResultSet()">... данные недоступны.</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts">
  import ApplicationData from '@/common/data/ApplicationData';
  import Lesson from '@/models/api/entities/v1/base/Lesson';
  import ResultMessages from '@/models/common/messages/ResultMessages';
  import Swal from 'sweetalert2';
  import { Options, Vue } from 'vue-class-component';

  @Options({
    props: {
      resultItemId: Number,
      lessons: Array<Lesson>,
    },
  })
  export default class LegacyLessons extends Vue {
    public resultItemId!: number;

    public lessons!: Array<Lesson>;

    public declare isScreenNarrow: boolean;

    public beforeMount(): void {
      this.isScreenNarrow = window.innerWidth <= ApplicationData.CLIENT_NARROW_MAX_WIDTH;
    }

    public getColspanForEmptyResultSet(): number {
      return this.isScreenNarrow ? 1 : 2;
    }

    // eslint-disable-next-line class-methods-use-this
    public getClassesForLessonRowItem = (lesson: Lesson) => (lesson.changed ? 'altered-element' : '');

    public showInfoAboutLesson(lesson: Lesson) {
      if (this.isScreenNarrow) {
        const message = ResultMessages.LegacyLessonDetailsMessage.message
          .replace('{0}', lesson.place || '[N/A]');
        Swal.fire(ResultMessages.LegacyLessonDetailsMessage.title, message, 'info');
      }
    }
  }
</script>

<style scoped>
  @import "@/../public/css/result/result-item.css";
</style>
