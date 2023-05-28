import ModernAPIEntitiesParent from '../common/ModernAPIEntitiesParent';

export default class BasicSchedule extends ModernAPIEntitiesParent {
  public id: number;

  public targetGroup: string;

  public dayIndex: number;

  public constructor(id: number, targetGroup: string, dayIndex: number) {
    super();

    this.id = id;
    this.targetGroup = targetGroup;
    this.dayIndex = dayIndex;
  }
}
