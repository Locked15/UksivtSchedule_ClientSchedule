import ScheduleOfDay from '@/models/entities/base/ScheduleOfDay';

export default class FinalSchedule {
  ActualChanges: boolean;

  ChangesFound: boolean;

  ScheduleDate: Date | null;

  Schedule: ScheduleOfDay;

  constructor(
    changesFound: boolean,
    actualChanges: boolean,
    scheduleDate: Date | null,
    schedule: ScheduleOfDay,
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
