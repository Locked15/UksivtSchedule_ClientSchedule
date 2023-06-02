import DateWorker from '@/common/utils/DateWorker';

import ModernAPIEntitiesParent from '../ModernAPIEntitiesParent';
import {
  isInstanceOfGroupBasicScheduleWrapper,
  isInstanceOfGroupFinalScheduleWrapper,
  isInstanceOfGroupScheduleReplacementWrapper,
  isInstanceOfTeacherScheduleWrapper,
} from './ModernEntityCastUtils';

export default function getFullTimeFromModernInstance(instance: ModernAPIEntitiesParent): number | null {
  if (isInstanceOfGroupBasicScheduleWrapper(instance)) return DateWorker.getFullTime(instance.targetDate);
  if (isInstanceOfGroupScheduleReplacementWrapper(instance)) return DateWorker.getFullTime(instance.targetDate);
  if (isInstanceOfGroupFinalScheduleWrapper(instance)) return DateWorker.getFullTime(instance.targetDate);
  if (isInstanceOfTeacherScheduleWrapper(instance)) return DateWorker.getFullTime(instance.targetDate);

  return null;
}
