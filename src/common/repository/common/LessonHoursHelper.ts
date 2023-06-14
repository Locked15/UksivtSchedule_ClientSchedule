/* eslint-disable no-param-reassign */
import DateWorker from '@/common/utils/workers/DateWorker';
import LessonHoursWorker from '@/common/utils/workers/LessonHoursWorker';
import Lesson from '@/models/api/entities/v1/base/Lesson';

export function getLessonTargetHoursForLegacyEntity(lessonNumber: number, target: string, dayIndex: number) {
  return LessonHoursWorker.getLessonHours(lessonNumber, dayIndex, target);
}

export function addLessonsTargetHoursForLegacyEntity(target: string, dayIndex: number, lessons: Lesson[]) {
  lessons.forEach((lesson) => {
    lesson.targetHours = getLessonTargetHoursForLegacyEntity(lesson.number, target, dayIndex);
  });
}

export function getLessonTargetHoursForModernEntity(lessonNumber: number, target: string, date: Date) {
  const targetDayIndex = DateWorker.getNormalizedDayOfWeek(date);
  return LessonHoursWorker.getLessonHours(lessonNumber, targetDayIndex, target);
}
