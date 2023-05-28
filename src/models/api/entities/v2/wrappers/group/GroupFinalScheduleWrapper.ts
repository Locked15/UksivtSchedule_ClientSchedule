import GroupLesson from '../../GroupLesson';
import ModernFinalSchedule from '../../base/FinalSchedule';
import ModernAPIEntitiesParent from '../../common/ModernAPIEntitiesParent';

export default class GroupFinalScheduleWrapper extends ModernAPIEntitiesParent {
  public targetDate: Date;

  public finalSchedulesForDateIsAvailable: boolean;

  public finalSchedule: ModernFinalSchedule;

  public lessonsInfo: Array<GroupLesson>;

  public constructor(
    targetDate: Date,
    finalSchedulesForDateIsAvailable: boolean,
    finalSchedule: ModernFinalSchedule,
    lessonsInfo: Array<GroupLesson>,
  ) {
    super();

    this.targetDate = targetDate;
    this.finalSchedulesForDateIsAvailable = finalSchedulesForDateIsAvailable;
    this.finalSchedule = finalSchedule;
    this.lessonsInfo = lessonsInfo;
  }
}
