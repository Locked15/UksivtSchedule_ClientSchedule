import Day from '@/models/api/entities/v1/base/Day';
import UserMessages from '@/models/common/messages/UserMessages';
import UserSettings from '@/models/common/user/UserSettings';
import Swal from 'sweetalert2';

export default class ResultSelectionModel {
  public groupName: string;

  public selectedDays: Array<Day>;

  public currentUserSettings: UserSettings;

  public readonly ALL_AVAILABLE_DAYS = Day.ALL_AVAILABLE_DAYS;

  public static readonly DEFAULT_GROUP_NAME = '19П-3';

  public constructor(groupName: string, settings: UserSettings, selectedDays: Array<Day>) {
    this.groupName = groupName;
    this.currentUserSettings = settings;
    this.selectedDays = selectedDays;
  }

  public static getDefaultModel(): ResultSelectionModel {
    const currentDay = this.getNormalizedDayOfWeek();
    let settings = UserSettings.getUserSettings();
    if (settings === null) {
      Swal.fire(UserMessages.UserNotFound.title, UserMessages.UserNotFound.message, 'info');

      settings = UserSettings.getDefaultUserSettings();
      settings.saveCurrentUserSettings();
    }

    return new ResultSelectionModel('', settings, [Day.getDayFromIndex(currentDay)]);
  }

  private static getNormalizedDayOfWeek(): number {
    const date = new Date();
    let dayOfWeek = date.getDay();
    // Day of week in JS/TS starts from Sunday, so we must to normalize it.
    if (dayOfWeek === 0) {
      dayOfWeek = 7;
    }

    // We need to shift this value (to make it start from Monday):
    return dayOfWeek - 1;
  }
}
