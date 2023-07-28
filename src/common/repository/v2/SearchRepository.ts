import Axios from 'axios';
import { SAVED_TEACHERS_DATA } from '@/common/keys';
import APIRequestFactory from '@/models/api/connection/APIRequestFactory';
import APIModernRequestFactoryExtension from '@/models/api/connection/extensions/APIModernRequestFactoryExtension';
import Teacher from '@/models/api/entities/v2/base/Teacher';

import IScheduleAPIRepository from '../base/IScheduleAPIRepository';
import ErrorResolver from '../common/ErrorResolver';

export default class SearchRepository implements IScheduleAPIRepository {
  public useStableBranch: boolean;

  public constructor(useStableBranch: boolean) {
    this.useStableBranch = useStableBranch;
  }

  public async getTeachersList(abortOnFailure = false): Promise<Array<Teacher>> {
    const savedStorageData = localStorage.getItem(SAVED_TEACHERS_DATA);
    if (savedStorageData != null && savedStorageData.length > 0) {
      return JSON.parse(savedStorageData);
    }

    const data = this.getTeachersListFromAPI(abortOnFailure);
    data.then((teachers: Teacher[]) => localStorage.setItem(SAVED_TEACHERS_DATA, JSON.stringify(teachers)));
    return data;
  }

  private async getTeachersListFromAPI(abortOnFailure: boolean): Promise<Array<Teacher>> {
    const data = await SearchRepository.tryToRequestTeacherListFromAPI(this.useStableBranch, abortOnFailure);
    if (data == null && !abortOnFailure) {
      return SearchRepository.tryToRequestTeacherListFromAPI(!this.useStableBranch, true);
    }

    return data;
  }

  private static async tryToRequestTeacherListFromAPI(useStableBranch: boolean, alert: boolean): Promise<Array<Teacher>> {
    const route = this.createRouteForTeacherListRequest(useStableBranch);
    const data: Promise<Array<Teacher>> = await Axios.get(route)
      .then((response) => response.data)
      .catch((error) => {
        if (alert) {
          new ErrorResolver(error).alertAboutError();
        }
      });

    return data;
  }

  private static createRouteForTeacherListRequest(useStableBranch: boolean): string {
    const routeFactory = new APIRequestFactory(useStableBranch, true);
    APIModernRequestFactoryExtension.applyTeacherSearchForRoutePath(routeFactory, true);

    const route = routeFactory.build();
    return route.toString();
  }
}
