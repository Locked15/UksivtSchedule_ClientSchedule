import Lesson from '@/models/api/entities/v1/base/Lesson';
import ModernAPILessonEntitiesParent from '@/models/api/entities/v2/common/ModernAPILessonEntitiesParent';
import { getLessonSpecifiedTarget, getPassedLessonsCountInString } from '@/models/api/entities/v2/common/cast/ModernLessonUtils';
import ResultMessages from '@/models/common/messages/ResultMessages';

export function getLessonTargetHoursBoundary(extractStart: boolean, targetHours: string[]): string {
  if (targetHours.length > 0) {
    const item = extractStart ? targetHours[0] : targetHours[targetHours.length - 1];
    const splitResults = item.split(' — ');

    return extractStart ? splitResults[0] : splitResults[splitResults.length - 1];
  }
  return '[N/A]';
}

export function getLegacyLessonInfoMessage(lesson: Lesson): string {
  const message = ResultMessages.LegacyLessonDetailsMessage.message
    .replace('{0}', lesson.place ?? '[N/A]')
    .replace('{1}', getLessonTargetHoursBoundary(true, lesson.targetHours))
    .replace('{2}', getLessonTargetHoursBoundary(false, lesson.targetHours));

  return message;
}

export function getModernLessonInfoMessage(lesson: ModernAPILessonEntitiesParent, forTeacher: boolean): string {
  const message = ResultMessages.ModernLessonDetailsMessage.message
    .replace('{0}', getLessonSpecifiedTarget(lesson, forTeacher) ?? '[N/A]')
    .replace('{1}', lesson.lessonHoursPassed?.toString() ?? '[N/A]')
    .replace('{2}', getPassedLessonsCountInString(lesson))
    .replace('{3}', getLessonTargetHoursBoundary(true, lesson.lessonTargetHours))
    .replace('{4}', getLessonTargetHoursBoundary(false, lesson.lessonTargetHours));

  return message;
}
