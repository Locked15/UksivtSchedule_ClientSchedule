import BasicSchedule from '../BasicSchedule';
import FinalSchedule from '../FinalSchedule';
import ScheduleReplacement from '../ScheduleReplacement';
import LegacyAPIEntitiesParent from './LegacyAPIEntitiesParent';

export function isInstanceOfLegacyEntity(instance: any): instance is LegacyAPIEntitiesParent {
  if (instance) {
    // eslint-disable-next-line no-underscore-dangle
    const legacyMarkIsPresented = instance._isLegacyEntity !== undefined;
    // eslint-disable-next-line no-underscore-dangle
    const legacyMarkIsPresentedInValue = instance.value && instance.value._isLegacyEntity !== undefined;

    return legacyMarkIsPresented || legacyMarkIsPresentedInValue;
  }
  return false;
}

export function isScheduleOfDay(instance: any): instance is BasicSchedule {
  if (instance) {
    const isDayPresented = instance.day !== undefined;
    const isLessonPresented = instance.lessons !== undefined;

    return isDayPresented && isLessonPresented;
  }
  return false;
}

export function isScheduleReplacement(instance: any): instance is ScheduleReplacement {
  if (instance) {
    const isChangesFoundPresented = instance.changesFound !== undefined;
    const isAbsoluteChangesPresented = instance.absoluteChanges !== undefined;
    const isChangesDatePresented = instance.changesDate !== undefined;
    const isNewLessonsPresented = instance.newLessons !== undefined;

    return isChangesFoundPresented && isAbsoluteChangesPresented
        && isChangesDatePresented && isNewLessonsPresented;
  }
  return false;
}

export function isFinalSchedule(instance: any): instance is FinalSchedule {
  if (instance) {
    const isActualChangesPresented = instance.actualChanges !== undefined;
    const isChangesFoundPresented = instance.changesFound !== undefined;
    const isScheduleDatePresented = instance.scheduleDate !== undefined;
    const isSchedulePresented = instance.schedule !== undefined;

    return isActualChangesPresented && isChangesFoundPresented
        && isScheduleDatePresented && isSchedulePresented;
  }
  return false;
}
