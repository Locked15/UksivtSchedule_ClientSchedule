import GroupLesson from '../../GroupLesson';
import ModernBasicSchedule from '../../base/BasicSchedule';
import ModernAPIEntitiesParent from '../../common/ModernAPIEntitiesParent';

export default class GroupBasicScheduleWrapper extends ModernAPIEntitiesParent {
  public dayIndex: number;

  public targetDate: Date;

  public basicSchedule: ModernBasicSchedule;

  public lessonsInfo: Array<GroupLesson>;

  public constructor(dayIndex: number, targetDate: Date, basicSchedule: ModernBasicSchedule, lessonsInfo: Array<GroupLesson>) {
    super();

    this.dayIndex = dayIndex;
    this.targetDate = targetDate;
    this.basicSchedule = basicSchedule;
    this.lessonsInfo = lessonsInfo;
  }
}
