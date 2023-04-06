export default class FinalSchedule {
  id: number;

  hashCode: number;

  targetDate: Date;

  targetGroup: string;

  constructor(id: number, targetDate: Date, targetGroup: string, hashCode: number) {
    this.id = id;
    this.hashCode = hashCode;
    this.targetDate = targetDate;
    this.targetGroup = targetGroup;
  }
}
