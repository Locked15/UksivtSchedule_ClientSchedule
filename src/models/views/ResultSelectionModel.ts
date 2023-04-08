import Day from '@/models/entities/Day';

export default class ResultSelectionModel {
  public groupName: string;

  public selectedDays: Array<Day>;

  public static readonly defaultGroupName = '19П-3';

  public constructor(groupName: string, selectedDays: Array<Day>) {
    this.groupName = groupName;
    this.selectedDays = selectedDays;
  }

  public static getDefaultModel(): ResultSelectionModel {
    return new ResultSelectionModel('', [Day.MONDAY]);
  }
}
