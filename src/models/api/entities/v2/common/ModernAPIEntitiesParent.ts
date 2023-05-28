/* eslint-disable @typescript-eslint/no-empty-interface */
import IEntityParent from '@/models/api/entities/base/IEntityParent';

/**
 * Basic super-type for all V2 API entities.
 */
export default abstract class ModernAPIEntitiesParent implements IEntityParent {
  declare _isModernEntity: boolean | undefined;
}
