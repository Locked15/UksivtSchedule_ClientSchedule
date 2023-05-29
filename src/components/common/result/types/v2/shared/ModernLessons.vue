<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Номер</th>
        <th class="text-left">Название</th>
        <th class="text-left">Аудитория</th>
        <th class="text-left">{{ getLessonTargetTitle() }}</th>
        <th class="text-left">Часов</th>
        <th class="text-left" title="На данный момент нереализовано..."><i>Время</i></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="lesson in lessons" :key="`${resultItemId}-${lesson.lessonNumber}`" :class="lesson.lessonIsChanged ? 'altered-element' : ''">
        <td>{{ lesson.lessonNumber }}</td>
        <td>{{ lesson.lessonName }}</td>
        <td>{{ lesson.lessonPlace }}</td>
        <td>{{ getLessonTargetContent(lesson) }}</td>
        <td>{{ lesson.lessonHoursPassed }}</td>
        <td>🕛 ... 🕧</td>
      </tr>

      <tr class="data-is-empty" v-if="lessons.length < 1">
        <td class="table-warning-text" colspan="2">Пары отсутствуют...</td>
        <td class="table-warning-text" colspan="2">... или ...</td>
        <td class="table-warning-text" colspan="2">... данные недоступны.</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts">
  import ModernAPILessonEntitiesParent from '@/models/api/entities/v2/common/ModernAPILessonEntitiesParent';
  import getLessonSpecifiedTarget from '@/models/api/entities/v2/common/ModernEntityCastUtils';
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

    public getLessonTargetTitle(): string {
      return this.forTeacher ? 'Группа' : 'Преподаватель';
    }

    public getLessonTargetContent(lesson: ModernAPILessonEntitiesParent): string | null {
      return getLessonSpecifiedTarget(lesson, this.forTeacher);
    }
  }
</script>

<style scoped>
  @import "@/../public/css/result/result-item.css";
</style>
