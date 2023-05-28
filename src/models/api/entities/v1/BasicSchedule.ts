import Lesson from '@/models/api/entities/v1/base/Lesson';
import LegacyAPIEntitiesParent from '@/models/api/entities/v1/common/LegacyAPIEntitiesParent';

export default class BasicSchedule extends LegacyAPIEntitiesParent {
  /**
   * This property represents 'Day' property.
   * @type {string} because currently Day returns as day name, this is string value.
   */
  public day: string;

  public lessons: Lesson[];

  public constructor(day: string, lessons: Lesson[]) {
    super();

    this.day = day;
    this.lessons = lessons;
  }
}
