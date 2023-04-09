export default interface ScheduleRepository<T> {
  useDbAsSource: boolean;

  useStableBranch: boolean;

  getDataFromAPI(
    dayIndex: number,
    groupName: string,
    remainAttempts: number,
  ): Promise<T>;

  tryToGetDataFromAPI(dayIndex: number, groupName: string): Promise<T>;
}
