import DateWorker from '@/common/utils/workers/DateWorker';
import Day from '@/models/api/entities/v1/base/Day';
import SelectableInformation from '@/models/common/user/SelectableInformation';
import UserSettings from '@/models/common/user/UserSettings';
import ResultDateSelectorModel from '../../widgets/ResultDateSelectorModel';

export default class ResultDialogComponentModel {
  public userSettings: UserSettings;

  public target: string;

  public selectionType: SelectableInformation;

  public selectionByTeachers: boolean;

  public targetDates: Array<Date>;

  public results: Array<any>;

  public constructor(
    target: string,
    selectionByTeachers: boolean,
    selectionType: SelectableInformation,
    selectionModel: ResultDateSelectorModel,
    userSettings: UserSettings,
  ) {
    this.userSettings = userSettings;
    this.target = target;
    this.selectionType = selectionType;
    this.selectionByTeachers = selectionByTeachers;
    this.results = new Array<any>();

    this.targetDates = ResultDialogComponentModel.getTargetDatesByDateSelectionModel(selectionModel);
  }

  private static getTargetDatesByDateSelectionModel(selectionModel: ResultDateSelectorModel): Array<Date> {
    if (selectionModel.forTargetDatesSelectionMode) {
      return selectionModel.selectedTargetDates;
    }
    return this.getTargetDatesBySelectedDays(selectionModel.selectedDays);
  }

  private static getTargetDatesBySelectedDays(selectedDays: Array<Day>): Array<Date> {
    const selectedDates = selectedDays.map<Date>((day) => DateWorker.getDateFromDayIndex(day.index));
    console.log(selectedDates.toString());

    return selectedDates;
  }
}
