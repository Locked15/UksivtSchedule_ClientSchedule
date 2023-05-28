import GroupLesson from '../../GroupLesson';
import ModernScheduleReplacement from '../../base/ScheduleReplacement';
import ModernAPIEntitiesParent from '../../common/ModernAPIEntitiesParent';

export default class GroupScheduleReplacementWrapper extends ModernAPIEntitiesParent {
  public targetDate: Date;

  public replacementsForDateIsAvailable: boolean;

  public scheduleReplacement: ModernScheduleReplacement;

  public lessonsInfo: Array<GroupLesson>;

  public constructor(
    targetDate: Date,
    replacementsForDateIsAvailable: boolean,
    scheduleReplacement: ModernScheduleReplacement,
    lessonsInfo: Array<GroupLesson>,
  ) {
    super();

    this.targetDate = targetDate;
    this.replacementsForDateIsAvailable = replacementsForDateIsAvailable;
    this.scheduleReplacement = scheduleReplacement;
    this.lessonsInfo = lessonsInfo;
  }
}
