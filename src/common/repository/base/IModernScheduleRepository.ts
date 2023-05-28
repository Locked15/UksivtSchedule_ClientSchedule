import IScheduleAPIRepository from '@/common/repository/base/IScheduleAPIRepository';
import ModernAPIEntitiesParent from '@/models/api/entities/v2/common/ModernAPIEntitiesParent';

// eslint-disable-next-line vue/max-len
export default interface IModernScheduleRepository<T extends ModernAPIEntitiesParent> extends IScheduleAPIRepository {
  getDataFromAPIForGroup(targetGroup: string, targetDate: Date, remainAttempts: number): Promise<T>;

  getDataFromAPIForTeacher(teacherId: number, targetDate: Date, remainAttempts: number): Promise<T>;

  tryToGetDataFromAPIForGroup(targetGroup: string, targetDate: Date): Promise<T>;

  tryToGetDataFromAPIForTeacher(teacherId: number, targetDate: Date): Promise<T>;
}
