import IModernAPILessonEntity from './IModernAPILessonEntity';
import ModernAPIEntitiesParent from './ModernAPIEntitiesParent';

export default abstract class ModernAPILessonEntitiesParent extends ModernAPIEntitiesParent implements IModernAPILessonEntity {
  public _isModernLesson: boolean | undefined;

  public lessonNumber: number | null;

  public lessonName: string | null;

  public lessonPlace: string | null;

  public lessonIsChanged: boolean | null;

  public lessonHoursPassed: number | null;

  public lessonTargetHours: string[];

  public constructor(
    lessonNumber: number | null,
    lessonName: string | null,
    lessonPlace: string | null,
    lessonIsChanged: boolean | null,
    lessonHoursPassed: number | null,
  ) {
    super();

    this.lessonNumber = lessonNumber;
    this.lessonName = lessonName;
    this.lessonPlace = lessonPlace;
    this.lessonIsChanged = lessonIsChanged;
    this.lessonHoursPassed = lessonHoursPassed;
    this.lessonTargetHours = [];
  }

  public abstract getSpecifiedTarget(): string | null;
}
