import BasicSchedule from '@/models/api/entities/v1/BasicSchedule';
import LegacyAPIEntitiesParent from '@/models/api/entities/v1/common/LegacyAPIEntitiesParent';

export default class FinalSchedule extends LegacyAPIEntitiesParent {
  public actualChanges: boolean;

  public changesFound: boolean;

  public scheduleDate: Date | null;

  public schedule: BasicSchedule;

  constructor(
    changesFound: boolean,
    actualChanges: boolean,
    scheduleDate: Date | null,
    schedule: BasicSchedule,
  ) {
    super();

    this.changesFound = changesFound;
    this.actualChanges = actualChanges;
    this.scheduleDate = scheduleDate;
    this.schedule = schedule;
  }
}
