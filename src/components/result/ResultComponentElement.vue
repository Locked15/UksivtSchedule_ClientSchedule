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
      <tr v-for="lesson in lessons" :key="`${dayId}-${lesson.Number}`" :class="lesson.Changed ? 'altered-element' : ''">
        <td>{{ lesson.Number }}</td>
        <td>{{ lesson.Name }}</td>
        <td>{{ lesson.Teacher || 'Отсутствует' }}</td>
        <td>{{ lesson.Place || 'Отсутствует' }}</td>
        <td>🕛 ... 🕧</td>
      </tr>

      <tr v-if="lessons.length < 1">
        <td class="table-warning-text" colspan="2">Пары отсутствуют...</td>
        <td class="table-warning-text">... или ...</td>
        <td class="table-warning-text" colspan="2">... данные недоступны.</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts">
  import Lesson from '@/models/entities/base/Lesson';
  import { Options, Vue } from 'vue-class-component';

  @Options({
    props: {
      dayId: Number,
      lessons: Array<Lesson>,
    },
  })
  export default class ResultComponentElement extends Vue {
    dayId!: number;

    lessons!: Lesson[];
  }
</script>

<style scoped>
  tr.altered-element {
    font-weight: bold;
    font-style: italic;
    text-decoration: underline;
  }

  .table-warning-text {
    text-align: center;
  }
</style>
