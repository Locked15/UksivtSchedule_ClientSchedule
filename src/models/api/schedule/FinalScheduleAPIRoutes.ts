export default class FinalScheduleAPIRoutes {
  public static readonly FINAL_CONTROLLER = 'final';

  public static readonly DAY_ROUTE = 'day';

  public static readonly GROUP_NAME_PARAMETER = 'groupName';

  public static readonly DAY_INDEX_PARAMETER = 'dayIndex';

  public static getRoutesByMode(isDbMode: boolean) : string[] {
    // ToDo: When DB is complete, update this.
    if (isDbMode) {
      return Array<string>(this.FINAL_CONTROLLER, this.DAY_ROUTE);
    }

    return Array<string>(this.FINAL_CONTROLLER, this.DAY_ROUTE);
  }
}
