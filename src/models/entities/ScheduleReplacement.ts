import Lesson from '@/models/entities/base/Lesson';

export default class ScheduleReplacement {
  public ChangesFound: boolean;

  public AbsoluteChanges: boolean;

  public ChangesDate: Date;

  public NewLessons: Lesson[];

  public constructor(
    changesFound: boolean,
    absoluteChanges: boolean,
    changesDate: Date,
    newLessons: Lesson[],
  ) {
    this.ChangesFound = changesFound;
    this.AbsoluteChanges = absoluteChanges;
    this.ChangesDate = changesDate;
    this.NewLessons = newLessons;
  }
}
