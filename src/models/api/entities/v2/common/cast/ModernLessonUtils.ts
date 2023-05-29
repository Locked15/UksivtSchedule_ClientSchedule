import GroupLesson from '../../GroupLesson';
import TeacherLesson from '../../TeacherLesson';
import ModernAPILessonEntitiesParent from '../ModernAPILessonEntitiesParent';

export function getLessonSpecifiedTarget(lesson: ModernAPILessonEntitiesParent, forTeacher: boolean): string | null {
  if (forTeacher) {
    const castedToTeacherLesson = lesson as TeacherLesson;
    const newInstance = new TeacherLesson(
      castedToTeacherLesson.lessonNumber,
      castedToTeacherLesson.lessonName,
      castedToTeacherLesson.lessonPlace,
      castedToTeacherLesson.lessonGroup,
      castedToTeacherLesson.lessonIsChanged,
      castedToTeacherLesson.lessonHoursPassed,
    );
    return newInstance.getSpecifiedTarget();
  }
  if (!forTeacher) {
    const castedToGroupLesson = lesson as GroupLesson;
    if (castedToGroupLesson && !forTeacher) {
      const newInstance = new GroupLesson(
        castedToGroupLesson.lessonNumber,
        castedToGroupLesson.lessonName,
        castedToGroupLesson.lessonPlace,
        castedToGroupLesson.lessonTeacher,
        castedToGroupLesson.lessonIsChanged,
        castedToGroupLesson.lessonHoursPassed,
      );
      return newInstance.getSpecifiedTarget();
    }
  }

  return null;
}

export function getPassedLessonsCount(lesson: ModernAPILessonEntitiesParent): number {
  const hoursPassed = lesson.lessonHoursPassed;
  if (hoursPassed != null) {
    return hoursPassed / 2;
  }
  return -1;
}

export function getPassedLessonsCountInString(lesson: ModernAPILessonEntitiesParent): string {
  const hours = getPassedLessonsCount(lesson);
  return hours !== -1 ? hours.toString() : '[N/A]';
}
