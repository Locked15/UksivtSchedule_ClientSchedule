import Lesson from '@/models/entities/base/Lesson';

export default class ScheduleOfDay {
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

  public static isScheduleOfDay(instance: any): instance is ScheduleOfDay {
    const isDayPresented = instance.Day !== undefined;
    const isLessonPresented = instance.Lessons !== undefined;

    return isDayPresented && isLessonPresented;
  }
}
