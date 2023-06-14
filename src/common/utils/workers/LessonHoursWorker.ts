import { getCourseFromGroupName } from '../helpers/ScheduleHelper';

export default class LessonHoursWorker {
  public static getLessonHours(lessonNumber: number, dayIndex: number, targetGroup: string): string[] {
    const course = getCourseFromGroupName(targetGroup);
    switch (dayIndex) {
      case 2:
        return LessonHoursWorker.getLessonHoursForWednesday(lessonNumber, course);
      case 5:
        return LessonHoursWorker.getLessonHoursForSaturday(lessonNumber);
      case 6:
        return LessonHoursWorker.getLessonHoursForSunday(lessonNumber);

      default:
        return LessonHoursWorker.getLessonHoursForCommonDay(lessonNumber, course);
    }
  }

  private static getLessonHoursForCommonDay(lessonNumber: number, course: number): string[] {
    switch (lessonNumber) {
      case 0:
        return ['7:50', '9:20'];
      case 1:
        return ['9:30 — 10:15', '10:20 — 11:05'];
      case 2: {
        if (course === 1) return ['11:15 — 12:00', '12:45 — 13:30'];
        if (course === 2) return ['11:15 — 12:00', '12:05 — 12:50'];
        return ['12:00 — 12:45', '12:45 — 13:30'];
      }
      case 3:
        return ['13:35 — 14:20', '14:25 — 15:10'];
      case 4:
        return ['15:20', '16:50'];
      case 5:
        return ['17:00', '18:20'];

      default:
        return ['18:30', '19:50'];
    }
  }

  private static getLessonHoursForWednesday(lessonNumber: number, course: number): string[] {
    switch (lessonNumber) {
      case 0:
        return ['7:50', '9:20'];
      case 1:
        return ['9:30 — 10:15', '10:20 — 11:05'];
      case 2: {
        if (course === 1) return ['11:15 — 12:00', '12:45 — 13:30'];
        if (course === 2) return ['11:15 — 12:00', '12:05 — 12:50'];
        return ['12:00 — 12:45', '12:45 — 13:30'];
      }
      case 3:
        return ['13:35 — 14:20', '14:25 — 15:10'];
      case 4:
        return ['16:10', '17:30'];
      case 5:
        return ['17:40', '18:50'];

      default:
        return ['19:00', '20:10'];
    }
  }

  private static getLessonHoursForSaturday(lessonNumber: number): string[] {
    switch (lessonNumber) {
      case 0:
        return ['8:00', '9:20'];
      case 1:
        return ['9:30', '10:50'];
      case 2:
        return ['11:00', '12:20'];
      case 3:
        return ['12:30', '13:50'];
      case 4:
        return ['14:00', '15:20'];
      case 5:
        return ['15:30', '16:50'];

      default:
        return ['17:00', '18:20'];
    }
  }

  /**
   * I'm not sure about Sunday schedule, so I made it with Saturday one.
   *
   * @param lessonNumber Number of the lesson.
   * @param course Number of target group course.
   */
  private static getLessonHoursForSunday = (lessonNumber: number) => LessonHoursWorker.getLessonHoursForSaturday(lessonNumber);
}
