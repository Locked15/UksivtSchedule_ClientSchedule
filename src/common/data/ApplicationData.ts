import Teacher from '@/models/api/entities/v2/base/Teacher';

export default class ApplicationData {
  public static availableGroups = new Array<string>();

  public static availableTeachers = new Array<Teacher>();
}
