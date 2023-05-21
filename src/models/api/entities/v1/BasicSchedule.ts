import Lesson from '@/models/api/entities/v1/base/Lesson';
import ILegacyAPIEntitiesParent from '@/models/api/entities/v1/common/ILegacyAPIEntitiesParent';

export default class BasicSchedule implements ILegacyAPIEntitiesParent {
  /**
   * This property represents 'Day' property.
   * @type {string} because currently Day returns as day name, this is string value.
   */
  public Day: string;

  public Lessons: Lesson[];

  public constructor(day: string, lessons: Lesson[]) {
    this.Day = day;
    this.Lessons = lessons;
  }

  public static isScheduleOfDay(instance: any): instance is BasicSchedule {
    const isDayPresented = instance.Day !== undefined;
    const isLessonPresented = instance.Lessons !== undefined;

    return isDayPresented && isLessonPresented;
  }
}
