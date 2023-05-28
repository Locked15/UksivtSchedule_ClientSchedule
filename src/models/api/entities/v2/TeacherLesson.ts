import ModernAPIEntitiesParent from './common/ModernAPIEntitiesParent';

export default class TeacherLesson extends ModernAPIEntitiesParent {
  public lessonNumber: number | null;

  public lessonName: string | null;

  public lessonPlace: string | null;

  public lessonGroup: string | null;

  public lessonIsChanged: boolean | null;

  public lessonHoursPassed: number | null;

  public constructor(
    lessonNumber: number | null,
    lessonName: string | null,
    lessonPlace: string | null,
    lessonGroup: string | null,
    lessonIsChanged: boolean | null,
    lessonHoursPassed: number | null,
  ) {
    super();

    this.lessonNumber = lessonNumber;
    this.lessonName = lessonName;
    this.lessonPlace = lessonPlace;
    this.lessonGroup = lessonGroup;
    this.lessonIsChanged = lessonIsChanged;
    this.lessonHoursPassed = lessonHoursPassed;
  }
}
