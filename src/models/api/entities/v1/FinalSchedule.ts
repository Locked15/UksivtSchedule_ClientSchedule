import BasicSchedule from '@/models/api/entities/v1/BasicSchedule';
import ILegacyAPIEntitiesParent from '@/models/api/entities/v1/common/ILegacyAPIEntitiesParent';

export default class FinalSchedule implements ILegacyAPIEntitiesParent {
  ActualChanges: boolean;

  ChangesFound: boolean;

  ScheduleDate: Date | null;

  Schedule: BasicSchedule;

  constructor(
    changesFound: boolean,
    actualChanges: boolean,
    scheduleDate: Date | null,
    schedule: BasicSchedule,
  ) {
    this.ChangesFound = changesFound;
    this.ActualChanges = actualChanges;
    this.ScheduleDate = scheduleDate;
    this.Schedule = schedule;
  }

  public static isFinalSchedule(instance: any): instance is FinalSchedule {
    const isActualChangesPresented = instance.ActualChanges !== undefined;
    const isChangesFoundPresented = instance.ChangesFound !== undefined;
    const isScheduleDatePresented = instance.ScheduleDate !== undefined;
    const isSchedulePresented = instance.Schedule !== undefined;

    return isActualChangesPresented && isChangesFoundPresented
        && isScheduleDatePresented && isSchedulePresented;
  }
}
