import ModernAPILessonEntitiesParent from './common/ModernAPIEntitiesParent';

export default class GroupLesson extends ModernAPILessonEntitiesParent {
  public lessonNumber: number | null;

  public lessonName: string | null;

  public lessonPlace: string | null;

  public lessonTeacher: string | null;

  public lessonIsChanged: boolean | null;

  public lessonHoursPassed: number | null;

  public constructor(
    lessonNumber: number | null,
    lessonName: string | null,
    lessonPlace: string | null,
    lessonTeacher: string | null,
    lessonIsChanged: boolean | null,
    lessonHoursPassed: number | null,
  ) {
    super();

    this.lessonNumber = lessonNumber;
    this.lessonName = lessonName;
    this.lessonPlace = lessonPlace;
    this.lessonTeacher = lessonTeacher;
    this.lessonIsChanged = lessonIsChanged;
    this.lessonHoursPassed = lessonHoursPassed;
  }
}
