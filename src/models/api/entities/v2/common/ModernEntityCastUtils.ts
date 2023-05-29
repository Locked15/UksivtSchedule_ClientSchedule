import GroupLesson from '../GroupLesson';
import TeacherLesson from '../TeacherLesson';
import Teacher from '../base/Teacher';
import TeacherScheduleWrapper from '../wrappers/TeacherScheduleWrapper';
import GroupBasicScheduleWrapper from '../wrappers/group/GroupBasicScheduleWrapper';
import GroupFinalScheduleWrapper from '../wrappers/group/GroupFinalScheduleWrapper';
import GroupScheduleReplacementWrapper from '../wrappers/group/GroupScheduleReplacementWrapper';
import ModernAPIEntitiesParent from './ModernAPIEntitiesParent';
import ModernAPILessonEntitiesParent from './ModernAPILessonEntitiesParent';

export function isInstanceOfModernEntity(instance: any): instance is ModernAPIEntitiesParent {
  if (instance) {
    // eslint-disable-next-line no-underscore-dangle
    const isModernMarkPresented = instance._isModernEntity !== undefined;
    // eslint-disable-next-line no-underscore-dangle
    const isModernMarkPresentedInValue = instance.value !== undefined && instance.value._isModernEntity !== undefined;

    return isModernMarkPresented || isModernMarkPresentedInValue;
  }
  return false;
}

export function isInstanceOfTeacher(instance: any): instance is Teacher {
  if (instance) {
    const isNamePresented = instance.name !== undefined;
    const isSurnamePresented = instance.surname !== undefined;
    const isPatronymicPresented = instance.patronymic !== undefined;

    return isNamePresented && isSurnamePresented && isPatronymicPresented;
  }
  return false;
}

export function isInstanceOfGroupBasicScheduleWrapper(instance: any): instance is GroupBasicScheduleWrapper {
  if (instance) {
    const isDayIndexPresented = instance.dayIndex !== undefined;
    const isTargetDatePresented = instance.targetDate !== undefined;
    const isBasicSchedulePresented = instance.basicSchedule !== undefined;
    const isLessonsInfoPresented = instance.lessonsInfo !== undefined;

    return isDayIndexPresented && isTargetDatePresented && isBasicSchedulePresented && isLessonsInfoPresented;
  }
  return false;
}

export function isInstanceOfGroupScheduleReplacementWrapper(instance: any): instance is GroupScheduleReplacementWrapper {
  if (instance) {
    const isTargetDatePresented = instance.targetDate !== undefined;
    const isReplacementsForDateIsAvailablePresented = instance.replacementsForDateIsAvailable !== undefined;
    const isScheduleReplacementPresented = instance.scheduleReplacement !== undefined;
    const isLessonsInfoPresented = instance.lessonsInfo !== undefined;

    return isTargetDatePresented && isReplacementsForDateIsAvailablePresented && isScheduleReplacementPresented && isLessonsInfoPresented;
  }
  return false;
}

export function isInstanceOfGroupFinalScheduleWrapper(instance: any): instance is GroupFinalScheduleWrapper {
  if (instance) {
    const isTargetDatePresented = instance.targetDate !== undefined;
    const isFinalSchedulesForDateIsAvailablePresented = instance.finalSchedulesForDateIsAvailable !== undefined;
    const isFinalSchedulePresented = instance.finalSchedule !== undefined;
    const isLessonsInfoPresented = instance.lessonsInfo !== undefined;

    return isTargetDatePresented && isFinalSchedulesForDateIsAvailablePresented && isFinalSchedulePresented && isLessonsInfoPresented;
  }
  return false;
}

export function isInstanceOfTeacherScheduleWrapper(instance: any): instance is TeacherScheduleWrapper {
  if (instance) {
    const isDayIndexPresented = instance.dayIndex !== undefined;
    const isTargetDatePresented = instance.targetDate !== undefined;
    const isReplacementsForDateIsAvailablePresented = instance.replacementsForDateIsAvailable !== undefined;
    const isLessonsInfoPresented = instance.lessonsInfo !== undefined;

    return isDayIndexPresented && isTargetDatePresented && isReplacementsForDateIsAvailablePresented && isLessonsInfoPresented;
  }
  return false;
}

export default function getLessonSpecifiedTarget(lesson: ModernAPILessonEntitiesParent, forTeacher: boolean): string | null {
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
