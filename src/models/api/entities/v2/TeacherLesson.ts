import ModernAPILessonEntitiesParent from './common/ModernAPILessonEntitiesParent';

export default class TeacherLesson extends ModernAPILessonEntitiesParent {
  public lessonGroup: string | null;

  public constructor(
    lessonNumber: number | null,
    lessonName: string | null,
    lessonPlace: string | null,
    lessonGroup: string | null,
    lessonIsChanged: boolean | null,
    lessonHoursPassed: number | null,
  ) {
    super(lessonNumber, lessonName, lessonPlace, lessonIsChanged, lessonHoursPassed);
    this.lessonGroup = lessonGroup;
  }

  public override getSpecifiedTarget(): string | null {
    return this.lessonGroup;
  }
}
