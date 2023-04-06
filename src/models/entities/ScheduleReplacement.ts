export default class ScheduleReplacement {
  id: number;

  scheduleHash: number;

  targetGroup: string;

  targetDate: Date;

  isAbsolute: boolean;

  constructor(id: number, hash: number, group: string, date: Date, isAbsolute: boolean) {
    this.id = id;
    this.scheduleHash = hash;
    this.targetGroup = group;
    this.targetDate = date;
    this.isAbsolute = isAbsolute;
  }
}
