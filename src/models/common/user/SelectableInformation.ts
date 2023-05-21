export default class SelectableInformation {
  public static readonly BASIC_SCHEDULE = new SelectableInformation(0, 'Базовое расписание');

  public static readonly SCHEDULE_REPLACEMENTS = new SelectableInformation(1, 'Замены расписания');

  public static readonly FINAL_SCHEDULE = new SelectableInformation(2, 'Итоговое расписание');

  public id: number;

  public type: string;

  private constructor(id: number, type: string) {
    this.id = id;
    this.type = type;
  }
}
