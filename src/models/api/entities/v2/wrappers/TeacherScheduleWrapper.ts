import TeacherLesson from '../TeacherLesson';
import ModernAPIEntitiesParent from '../common/ModernAPIEntitiesParent';

export default class TeacherScheduleWrapper extends ModernAPIEntitiesParent {
  public dayIndex: number;

  public targetDate: Date;

  public replacementsForDateIsAvailable: boolean;

  public lessonsInfo: Array<TeacherLesson>;

  public constructor(dayIndex: number, targetDate: Date, replacementsForDateIsAvailable: boolean, lessonsInfo: Array<TeacherLesson>) {
    super();

    this.dayIndex = dayIndex;
    this.targetDate = targetDate;
    this.replacementsForDateIsAvailable = replacementsForDateIsAvailable;
    this.lessonsInfo = lessonsInfo;
  }
}
