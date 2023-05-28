import LegacyAPIEntitiesParent from '@/models/api/entities/v1/common/LegacyAPIEntitiesParent';

export default class LegacyResultElementModel {
  public data: LegacyAPIEntitiesParent;

  public constructor(data: LegacyAPIEntitiesParent) {
    this.data = data;
  }
}
