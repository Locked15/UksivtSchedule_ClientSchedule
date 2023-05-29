import Teacher from '@/models/api/entities/v2/base/Teacher';

export default class ApplicationData {
  public static readonly CLIENT_NARROW_MAX_WIDTH = 480;

  public static availableGroups = new Array<string>();

  public static availableTeachers = new Array<Teacher>();
}
