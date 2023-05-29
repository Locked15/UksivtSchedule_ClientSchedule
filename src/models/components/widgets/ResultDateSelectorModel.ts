import Day from '@/models/api/entities/v1/base/Day';

export default class ResultDateSelectorModel {
  public selectedDays: Array<Day>;

  public selectedTargetDates: Array<Date>;

  public forTargetDatesSelectionMode: boolean;

  public readonly ALL_AVAILABLE_DAYS = Day.ALL_AVAILABLE_DAYS;

  public constructor(selectedDays: Array<Day>, selectedTargetDates: Array<Date>, forTargetDatesSelectionMode: boolean) {
    this.selectedDays = selectedDays;
    this.selectedTargetDates = selectedTargetDates;
    this.forTargetDatesSelectionMode = forTargetDatesSelectionMode;
  }

  public static getDefaultModel = () => new ResultDateSelectorModel(new Array<Day>(Day.getCurrentDay()), new Array<Date>(new Date()), false);

  public getAvailabilityState(): boolean {
    const selectedDaysCount = this.selectedDays.length;
    const selectedTargetDatesCount = this.selectedTargetDates.length;

    return (!this.forTargetDatesSelectionMode && selectedDaysCount > 0)
        || (this.forTargetDatesSelectionMode && selectedTargetDatesCount > 0);
  }
}
