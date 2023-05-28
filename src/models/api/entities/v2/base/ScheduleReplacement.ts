import ModernAPIEntitiesParent from '../common/ModernAPIEntitiesParent';

export default class ScheduleReplacement extends ModernAPIEntitiesParent {
  public id: number;

  public isAbsolute: boolean;

  public targetGroup: string;

  public constructor(id: number, isAbsolute: boolean, targetGroup: string) {
    super();

    this.id = id;
    this.isAbsolute = isAbsolute;
    this.targetGroup = targetGroup;
  }
}
