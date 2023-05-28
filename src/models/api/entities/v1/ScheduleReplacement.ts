import Lesson from '@/models/api/entities/v1/base/Lesson';
import LegacyAPIEntitiesParent from '@/models/api/entities/v1/common/LegacyAPIEntitiesParent';

export default class ScheduleReplacement extends LegacyAPIEntitiesParent {
  public changesFound: boolean;

  public absoluteChanges: boolean;

  public changesDate: Date;

  public newLessons: Lesson[];

  public constructor(
    changesFound: boolean,
    absoluteChanges: boolean,
    changesDate: Date,
    newLessons: Lesson[],
  ) {
    super();

    this.changesFound = changesFound;
    this.absoluteChanges = absoluteChanges;
    this.changesDate = changesDate;
    this.newLessons = newLessons;
  }
}
