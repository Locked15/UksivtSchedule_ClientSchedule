export default interface IModernAPILessonEntity {
  lessonNumber: number | null;

  lessonName: string | null;

  lessonPlace: string | null;

  lessonIsChanged: boolean | null;

  lessonHoursPassed: number | null;

  getSpecifiedTarget(): string | null;
}
