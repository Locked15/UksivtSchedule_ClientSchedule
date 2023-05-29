import DateWorker from '@/common/utils/DateWorker';
import APIRequestFactory from '@/models/api/connection/APIRequestFactory';
import APIModernRequestFactoryExtension from '@/models/api/connection/extensions/APIModernRequestFactoryExtension';
import TeacherScheduleWrapper from '@/models/api/entities/v2/wrappers/TeacherScheduleWrapper';
import GroupScheduleReplacementWrapper from '@/models/api/entities/v2/wrappers/group/GroupScheduleReplacementWrapper';
import Axios from 'axios';

import IModernScheduleRepository from '../../base/IModernScheduleRepository';
import ErrorResolver from '../../common/ErrorResolver';
import { addModernMark } from '../../common/MarkHelper';

export default class ScheduleReplacementRepository implements IModernScheduleRepository<GroupScheduleReplacementWrapper, TeacherScheduleWrapper> {
  public useStableBranch: boolean;

  public constructor(useStableBranch: boolean) {
    this.useStableBranch = useStableBranch;
  }

  public async getDataFromAPIForGroup(targetGroup: string, targetDate: Date, remainAttempts: number): Promise<GroupScheduleReplacementWrapper> {
    let attempts = remainAttempts;
    let data = await this.tryToGetDataFromAPIForGroup(targetGroup, targetDate);
    while (data === undefined && attempts > 0) {
      // eslint-disable-next-line no-await-in-loop
      data = await this.tryToGetDataFromAPIForGroup(targetGroup, targetDate);
      attempts -= 1;
    }

    addModernMark(data);
    return data;
  }

  public async tryToGetDataFromAPIForGroup(targetGroup: string, targetDate: Date): Promise<GroupScheduleReplacementWrapper> {
    const route = ScheduleReplacementRepository.createRouteForGroupScheduleReplacementRequest(this.useStableBranch);
    const data = await Axios.get(route, {
      params: {
        targetGroup,
        targetDate: DateWorker.getRequestVariantForDate(targetDate),
      },
    })
      .then((response) => response.data)
      .catch((error) => new ErrorResolver(error).alertAboutError());

    return data;
  }

  public async getDataFromAPIForTeacher(teacherId: number, targetDate: Date, remainAttempts: number): Promise<TeacherScheduleWrapper> {
    let attempts = remainAttempts;
    let data = await this.tryToGetDataFromAPIForTeacher(teacherId, targetDate);
    while (data === undefined && attempts > 0) {
      // eslint-disable-next-line no-await-in-loop
      data = await this.tryToGetDataFromAPIForTeacher(teacherId, targetDate);
      attempts -= 1;
    }

    addModernMark(data);
    return data;
  }

  public async tryToGetDataFromAPIForTeacher(teacherId: number, targetDate: Date): Promise<TeacherScheduleWrapper> {
    const route = ScheduleReplacementRepository.createRouteForTeacherScheduleReplacementRequest(this.useStableBranch);
    const data = await Axios.get(route, {
      params: {
        teacherId,
        targetDate: DateWorker.getRequestVariantForDate(targetDate),
      },
    })
      .then((response) => response.data)
      .catch((error) => new ErrorResolver(error).alertAboutError());

    return data;
  }

  private static createRouteForGroupScheduleReplacementRequest(useStableBranch: boolean) {
    const routeFactory = new APIRequestFactory(useStableBranch, true);
    APIModernRequestFactoryExtension.applyReplacementsForGroupRoutePath(routeFactory, true, true);

    const route = routeFactory.build();
    return route.toString();
  }

  private static createRouteForTeacherScheduleReplacementRequest(useStableBranch: boolean) {
    const routeFactory = new APIRequestFactory(useStableBranch, true);
    APIModernRequestFactoryExtension.applyReplacementsForTeacherRoutePath(routeFactory, true, true);

    const route = routeFactory.build();
    return route.toString();
  }
}
