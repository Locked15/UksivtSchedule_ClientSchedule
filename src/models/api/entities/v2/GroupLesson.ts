import ModernAPILessonEntitiesParent from './common/ModernAPILessonEntitiesParent';

export default class GroupLesson extends ModernAPILessonEntitiesParent {
  public lessonTeacher: string | null;

  public constructor(
    lessonNumber: number | null,
    lessonName: string | null,
    lessonPlace: string | null,
    lessonTeacher: string | null,
    lessonIsChanged: boolean | null,
    lessonHoursPassed: number | null,
  ) {
    super(lessonNumber, lessonName, lessonPlace, lessonIsChanged, lessonHoursPassed);
    this.lessonTeacher = lessonTeacher;
  }

  public override getSpecifiedTarget(): string | null {
    return this.lessonTeacher;
  }
}
