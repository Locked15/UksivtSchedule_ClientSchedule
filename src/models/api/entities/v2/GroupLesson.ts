import ModernAPIEntitiesParent from './common/ModernAPIEntitiesParent';

export default class GroupLesson extends ModernAPIEntitiesParent {
  public lessonNumber: number | null;

  public lessonName: string | null;

  public lessonTeacher: string | null;

  public lessonPlace: string | null;

  public lessonIsChanged: boolean | null;

  public lessonHoursPassed: number | null;

  public constructor(
    lessonNumber: number | null,
    lessonName: string | null,
    lessonTeacher: string | null,
    lessonPlace: string | null,
    lessonIsChanged: boolean | null,
    lessonHoursPassed: number | null,
  ) {
    super();

    this.lessonNumber = lessonNumber;
    this.lessonName = lessonName;
    this.lessonTeacher = lessonTeacher;
    this.lessonPlace = lessonPlace;
    this.lessonIsChanged = lessonIsChanged;
    this.lessonHoursPassed = lessonHoursPassed;
  }
}
