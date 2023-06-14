import DateWorker from '@/common/utils/workers/DateWorker';

import LegacyAPIEntitiesParent from '../LegacyAPIEntitiesParent';
import { isFinalSchedule, isScheduleOfDay, isScheduleReplacement } from './LegacyEntityCastUtils';

export default function getFullTimeFromLegacyInstance(dayIndex: number, instance: LegacyAPIEntitiesParent): number | null {
  if (isScheduleOfDay(instance)) return dayIndex;
  if (isScheduleReplacement(instance)) return instance.changesDate != null ? DateWorker.getFullTime(instance.changesDate) : dayIndex;
  if (isFinalSchedule(instance)) return instance.scheduleDate != null ? DateWorker.getFullTime(instance.scheduleDate) : dayIndex;

  return null;
}
