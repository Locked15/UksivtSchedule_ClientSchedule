/* eslint-disable vue/max-len */
import ILegacyScheduleRepository from '@/common/repository/base/ILegacyScheduleRepository';
import APIRequestFactory from '@/models/api/connection/APIRequestFactory';
import APILegacyRequestFactoryExtension from '@/models/api/connection/extensions/APILegacyRequestFactoryExtension';
import BasicSchedule from '@/models/api/entities/v1/BasicSchedule';
import Axios from 'axios';

import ErrorResolver from '../../common/ErrorResolver';
import { addLegacyMark } from '../../common/MarkHelper';

export default class BasicScheduleRepository implements ILegacyScheduleRepository<BasicSchedule> {
  public useStableBranch: boolean;

  public constructor(useStableBranch: boolean) {
    this.useStableBranch = useStableBranch;
  }

  public async getDataFromAPI(dayIndex: number, groupName: string, remainAttempts: number): Promise<BasicSchedule> {
    let attempts = remainAttempts;
    let data = await this.tryToGetDataFromAPI(dayIndex, groupName);
    while (data === undefined && attempts > 0) {
      // eslint-disable-next-line no-await-in-loop
      data = await this.tryToGetDataFromAPI(dayIndex, groupName);
      attempts -= 1;
    }

    addLegacyMark(data);
    return data;
  }

  public async tryToGetDataFromAPI(dayIndex: number, groupName: string): Promise<BasicSchedule> {
    const route = BasicScheduleRepository.createRouteForBasicScheduleRequest(this.useStableBranch);
    const data = await Axios.get(route, {
      params: {
        dayIndex,
        groupName,
      },
    })
      .then((response) => response.data)
      .catch((error) => new ErrorResolver(error).alertAboutError());

    return data;
  }

  private static createRouteForBasicScheduleRequest(useStableBranch: boolean): string {
    const routeFactory = new APIRequestFactory(useStableBranch, false);
    APILegacyRequestFactoryExtension.applyBasicScheduleRoutePath(routeFactory);

    const route = routeFactory.build();
    return route.toString();
  }
}
