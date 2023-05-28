import ModernAPIEntitiesParent from '../common/ModernAPIEntitiesParent';

export default class FinalSchedule extends ModernAPIEntitiesParent {
  public id: number;

  public targetGroup: string;

  public constructor(id: number, targetGroup: string) {
    super();

    this.id = id;
    this.targetGroup = targetGroup;
  }
}
