/* eslint-disable @typescript-eslint/no-empty-interface */
import IEntityParent from '@/models/api/entities/base/IEntityParent';

/**
 * Basic super-type for all V1 API entities.
 */
export default class LegacyAPIEntitiesParent implements IEntityParent {
  public declare _isLegacyEntity: boolean | undefined;
}
