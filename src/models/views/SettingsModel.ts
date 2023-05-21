import SelectableInformation from '@/models/common/user/SelectableInformation';
import UserSettings from '@/models/common/user/UserSettings';

export default class SettingsModel {
  public currentUserSettings: UserSettings;

  public userSettingsAreInitializedAgain = false;

  public readonly ALL_SELECTABLE_VARIANTS = [
    SelectableInformation.BASIC_SCHEDULE,
    SelectableInformation.SCHEDULE_REPLACEMENTS,
    SelectableInformation.FINAL_SCHEDULE,
  ];

  constructor() {
    let settings = UserSettings.getUserSettings();
    if (settings == null) {
      settings = UserSettings.getDefaultUserSettings();
      this.userSettingsAreInitializedAgain = true;
    }

    this.currentUserSettings = settings;
  }
}
