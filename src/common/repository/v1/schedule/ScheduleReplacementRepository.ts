/* eslint-disable vue/max-len */
import ILegacyScheduleRepository from '@/common/repository/base/ILegacyScheduleRepository';
import APIRequestFactory from '@/models/api/connection/APIRequestFactory';
import APILegacyRequestFactoryExtension from '@/models/api/connection/extensions/APILegacyRequestFactoryExtension';
import ScheduleReplacement from '@/models/api/entities/v1/ScheduleReplacement';
import Axios from 'axios';

import ErrorResolver from '../../common/ErrorResolver';
import { addLegacyMark } from '../../common/MarkHelper';

export default class ScheduleReplacementsRepository implements ILegacyScheduleRepository<ScheduleReplacement> {
  public useStableBranch: boolean;

  public constructor(useStableBranch: boolean) {
    this.useStableBranch = useStableBranch;
  }

  public async getDataFromAPI(dayIndex: number, groupName: string, remainAttempts: number): Promise<ScheduleReplacement> {
    let attempts = remainAttempts;
    let data = await this.tryToGetDataFromAPI(dayIndex, groupName);
    while (data === null && attempts > 0) {
      // eslint-disable-next-line no-await-in-loop
      data = await this.tryToGetDataFromAPI(dayIndex, groupName);
      attempts -= 1;
    }

    addLegacyMark(data);
    return data;
  }

  public async tryToGetDataFromAPI(dayIndex: number, groupName: string): Promise<ScheduleReplacement> {
    const route = ScheduleReplacementsRepository.createRouteForScheduleReplacementRequest(this.useStableBranch);
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

  private static createRouteForScheduleReplacementRequest(useStableBranch: boolean): string {
    const routeFactory = new APIRequestFactory(useStableBranch, false);
    APILegacyRequestFactoryExtension.applyReplacementsRoutePath(routeFactory);

    const route = routeFactory.build();
    return route.toString();
  }
}
