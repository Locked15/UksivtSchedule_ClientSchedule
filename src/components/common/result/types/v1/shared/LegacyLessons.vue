<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Номер</th>
        <th class="text-left">Название</th>
        <th class="text-left">Преподаватель</th>
        <th class="text-left">Аудитория</th>
        <th class="text-left" title="На данный момент нереализовано..."><i>Время</i></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="lesson in lessons" :key="`${resultItemId}-${lesson.number}`" :class="lesson.changed ? 'altered-element' : ''">
        <td>{{ lesson.number }}</td>
        <td>{{ lesson.name }}</td>
        <td>{{ lesson.teacher || 'Отсутствует' }}</td>
        <td>{{ lesson.place || 'Отсутствует' }}</td>
        <td>🕛 ... 🕧</td>
      </tr>

      <tr class="data-is-empty" v-if="lessons.length < 1">
        <td class="table-warning-text" colspan="2">Пары отсутствуют...</td>
        <td class="table-warning-text">... или ...</td>
        <td class="table-warning-text" colspan="2">... данные недоступны.</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts">
  import Lesson from '@/models/api/entities/v1/base/Lesson';
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
  }
</script>

<style scoped>
  @import "@/../public/css/result/result-item.css";
</style>
