import LegacyAPIEntitiesParent from '@/models/api/entities/v1/common/LegacyAPIEntitiesParent';
import ModernAPIEntitiesParent from '@/models/api/entities/v2/common/ModernAPIEntitiesParent';

export function addLegacyMark<T extends LegacyAPIEntitiesParent>(instance: T, setValue = true): void {
  // eslint-disable-next-line no-underscore-dangle, no-param-reassign
  instance._isLegacyEntity = setValue;
}

export function addModernMark<T extends ModernAPIEntitiesParent>(instance: T, setValue = true): void {
  // eslint-disable-next-line no-underscore-dangle, no-param-reassign
  instance._isModernEntity = setValue;
}
