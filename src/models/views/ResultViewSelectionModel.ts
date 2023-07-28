import Swal from 'sweetalert2';
import DateWorker from '@/common/utils/workers/DateWorker';
import Day from '@/models/api/entities/v1/base/Day';
import UserMessages from '@/models/common/messages/UserMessages';
import UserSettings from '@/models/common/user/UserSettings';

export default class ResultViewSelectionModel {
  public target: string;

  public selectedDays: Array<Day>;

  public searchByTeachers: boolean;

  public currentUserSettings: UserSettings;

  public readonly ALL_AVAILABLE_DAYS = Day.ALL_AVAILABLE_DAYS;

  public static readonly DEFAULT_GROUP_NAME = '19П-3';

  public constructor(target: string, settings: UserSettings, searchByTeachers: boolean, selectedDays: Array<Day>) {
    this.target = target;
    this.currentUserSettings = settings;
    this.searchByTeachers = searchByTeachers;
    this.selectedDays = selectedDays;
  }

  public static getDefaultModel(): ResultViewSelectionModel {
    const currentDay = DateWorker.getNormalizedDayOfWeek(new Date());
    let settings = UserSettings.getUserSettings();
    if (settings === null) {
      Swal.fire(UserMessages.UserNotFound.title, UserMessages.UserNotFound.message, 'info');

      settings = UserSettings.getDefaultUserSettings();
      settings.saveCurrentUserSettings();
    }

    return new ResultViewSelectionModel('', settings, false, [Day.getDayFromIndex(currentDay)]);
  }
}
