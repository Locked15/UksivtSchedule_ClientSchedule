import Day from '../entities/base/Day';
import SelectableInformation from '../user/SelectableInformation';
import UserSettings from '../user/UserSettings';

export default class ResultComponentModel {
  userSettings: UserSettings;

  targetGroup: string;

  selectionType: SelectableInformation;

  selectableDays: Array<Day>;

  results: Array<any>;

  public constructor(
    userSettings: UserSettings,
    targetGroup: string,
    selectionType: SelectableInformation,
    selectableDays: Array<Day>,
  ) {
    this.userSettings = userSettings;
    this.targetGroup = targetGroup;
    this.selectionType = selectionType;
    this.selectableDays = selectableDays;
    this.results = new Array<any>();
  }
}
