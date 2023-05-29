export default class DateWorker {
  public static getNormalizedDayOfWeek(date: Date): number {
    const normalizedDate = this.getNormalizedDateInstance(date);
    if (normalizedDate !== undefined && normalizedDate != null) {
      let dayOfWeek = normalizedDate.getDay();
      // Day of week in JS/TS starts from Sunday, so we must to normalize it.
      if (dayOfWeek === 0) {
        dayOfWeek = 7;
      }

      // We need to shift this value (to make it start from Monday):
      return dayOfWeek - 1;
    }

    console.warn('Got empty normalized date value on DayIndex extracting. Returned default value (0).');
    return 0;
  }

  public static getDateFromDayIndex(dayIndex: number): Date {
    const currentDate = new Date();
    while (this.getNormalizedDayOfWeek(currentDate) !== dayIndex) {
      this.shiftDateDayOfWeekByOneToBalance(dayIndex, currentDate);
    }

    return currentDate;
  }

  private static getNormalizedDateInstance = (date: Date) => new Date(date);

  private static shiftDateDayOfWeekByOneToBalance(targetDayIndex: number, dateObject: Date) {
    const normalizedDayOfWeek = this.getNormalizedDayOfWeek(dateObject);
    if (normalizedDayOfWeek < targetDayIndex) dateObject.setDate(dateObject.getDate() + 1);
    else if (normalizedDayOfWeek > targetDayIndex) dateObject.setDate(dateObject.getDate() - 1);
  }

  public static getDateTitleString(date: Date): string {
    const normalizedDate = this.getNormalizedDateInstance(date);
    const dayOfMonth = normalizedDate.getDate();
    const month = normalizedDate.getMonth() + 1;
    const year = normalizedDate.getFullYear();

    return `${dayOfMonth}-${month}-${year}!`;
  }

  public static getNamedDateTitleString(date: Date): string {
    const normalizedDate = this.getNormalizedDateInstance(date);
    const formattedDate = normalizedDate.toLocaleDateString('default', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return formattedDate;
  }

  public static getRequestVariantForDate(date: Date): string {
    const normalizedDate = this.getNormalizedDateInstance(date);
    const dayOfMonth = normalizedDate.getDate();
    const month = normalizedDate.getMonth() + 1;
    const year = normalizedDate.getFullYear();

    return `${year}-${month}-${dayOfMonth}`;
  }

  public static getRequestVariantForDateTime(date: Date): string {
    const normalizedDate = this.getNormalizedDateInstance(date);
    const isoString = normalizedDate.toISOString();

    return isoString.replace(/(\.\d+)?(Z|[+-]\d+(:\d+)?)$/, '');
  }

  public static getFullTime(date: Date): number {
    const normalizedDate = this.getNormalizedDateInstance(date);
    return normalizedDate.getTime();
  }
}
