import IScheduleAPIRepository from '@/common/repository/base/IScheduleAPIRepository';
import LegacyAPIEntitiesParent from '@/models/api/entities/v1/common/LegacyAPIEntitiesParent';

// eslint-disable-next-line vue/max-len
export default interface ILegacyScheduleRepository<T extends LegacyAPIEntitiesParent> extends IScheduleAPIRepository {
  getDataFromAPI(
    dayIndex: number,
    groupName: string,
    remainAttempts: number,
  ): Promise<T>;

  tryToGetDataFromAPI(dayIndex: number, groupName: string): Promise<T>;
}
