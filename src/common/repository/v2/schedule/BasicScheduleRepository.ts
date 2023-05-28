import DateWorker from '@/common/utils/DateWorker';
import APIRequestFactory from '@/models/api/connection/APIRequestFactory';
import APIModernRequestFactoryExtension from '@/models/api/connection/extensions/APIModernRequestFactoryExtension';
import BasicSchedule from '@/models/api/entities/v2/base/BasicSchedule';
import Axios from 'axios';

import IModernScheduleRepository from '../../base/IModernScheduleRepository';
import ErrorResolver from '../../common/ErrorResolver';
import { addModernMark } from '../../common/MarkHelper';

export default class BasicScheduleRepository implements IModernScheduleRepository<BasicSchedule> {
  public useStableBranch: boolean;

  public constructor(useStableBranch: boolean) {
    this.useStableBranch = useStableBranch;
  }

  public async getDataFromAPIForGroup(targetGroup: string, targetDate: Date, remainAttempts: number): Promise<BasicSchedule> {
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

  public async tryToGetDataFromAPIForGroup(targetGroup: string, targetDate: Date): Promise<BasicSchedule> {
    const route = BasicScheduleRepository.createRouteForGroupBasicScheduleRequest(this.useStableBranch);
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

  public async getDataFromAPIForTeacher(teacherId: number, targetDate: Date, remainAttempts: number): Promise<BasicSchedule> {
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

  public async tryToGetDataFromAPIForTeacher(teacherId: number, targetDate: Date): Promise<BasicSchedule> {
    const route = BasicScheduleRepository.createRouteForTeacherBasicScheduleRequest(this.useStableBranch);
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

  private static createRouteForGroupBasicScheduleRequest(useStableBranch: boolean): string {
    const routeFactory = new APIRequestFactory(useStableBranch, true);
    APIModernRequestFactoryExtension.applyBasicScheduleForGroupRoutePath(routeFactory, true, true);

    const route = routeFactory.build();
    return route.toString();
  }

  private static createRouteForTeacherBasicScheduleRequest(useStableBranch: boolean): string {
    const routeFactory = new APIRequestFactory(useStableBranch, true);
    APIModernRequestFactoryExtension.applyBasicScheduleForTeacherRoutePath(routeFactory, true, true);

    const route = routeFactory.build();
    return route.toString();
  }
}
