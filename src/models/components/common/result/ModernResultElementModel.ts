import ModernAPIEntitiesParent from '@/models/api/entities/v2/common/ModernAPIEntitiesParent';

export default class ModernResultElementModel {
  public data: ModernAPIEntitiesParent;

  public constructor(data: ModernAPIEntitiesParent) {
    this.data = data;
  }
}
