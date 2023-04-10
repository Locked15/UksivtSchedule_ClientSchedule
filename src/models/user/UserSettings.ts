import SelectableInformation from '@/models/user/SelectableInformation';
import { USER_SETTINGS_KEY } from '@/common/keys';

export default class UserSettings {
  public useDBAsSource: boolean;

  public useStableAPIBranch: boolean;

  public cookiesWarningIsShown: boolean;

  public informationToSelect: SelectableInformation[];

  constructor(
    useDb: boolean,
    useStableBranch: boolean,
    cookiesWarningIsShown: boolean,
    selectableList: SelectableInformation[],
  ) {
    this.useDBAsSource = useDb;
    this.useStableAPIBranch = useStableBranch;
    this.cookiesWarningIsShown = cookiesWarningIsShown;
    this.informationToSelect = selectableList;
  }

  static getUserSettings(): UserSettings | null {
    const settings = localStorage.getItem(USER_SETTINGS_KEY);
    if (settings != null) {
      return JSON.parse(settings);
    }

    return null;
  }

  static getDefaultUserSettings(): UserSettings {
    return new UserSettings(false, true, false, new Array(SelectableInformation.FINAL_SCHEDULE));
  }

  public saveCurrentUserSettings() {
    localStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(this));
  }
}
