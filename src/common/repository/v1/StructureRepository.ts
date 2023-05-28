/* eslint-disable vue/max-len */
import { SAVED_GROUPS_DATA } from '@/common/keys';
import APIRequestFactory from '@/models/api/connection/APIRequestFactory';
import APILegacyRequestFactoryExtension from '@/models/api/connection/extensions/APILegacyRequestFactoryExtension';
import Axios from 'axios';

import IScheduleAPIRepository from '../base/IScheduleAPIRepository';
import ErrorResolver from '../common/ErrorResolver';

export default class StructureRepository implements IScheduleAPIRepository {
  public useStableBranch: boolean;

  public constructor(useStableBranch: boolean) {
    this.useStableBranch = useStableBranch;
  }

  /**
   * Begins a process of querying the API to get groups list.
   * Also, before requesting API checks local storage (and returns saved data, if it exists).
   *
   * @param useStableBranch Which API branch will be used to retrieve groups (Stable or Preview).
   * @param abortOnFailure Will error be return, if no awaitable response will be got. Otherwise, new requests will be made.
   *
   * @returns Promise of the String array with group names.
   */
  public async getGroupsList(abortOnFailure = false): Promise<Array<string>> {
    const savedStorageData = localStorage.getItem(SAVED_GROUPS_DATA);
    if (savedStorageData != null && savedStorageData.length > 0) {
      return JSON.parse(savedStorageData);
    }

    const data = this.getGroupsListFromAPI(abortOnFailure);
    data.then((groups: string[]) => localStorage.setItem(SAVED_GROUPS_DATA, JSON.stringify(groups)));
    return data;
  }

  private async getGroupsListFromAPI(abortOnFailure: boolean): Promise<Array<string>> {
    const data = await StructureRepository.tryToRequestGroupListFromAPI(this.useStableBranch, abortOnFailure);
    if (data == null && !abortOnFailure) {
      return StructureRepository.tryToRequestGroupListFromAPI(!this.useStableBranch, true);
    }

    return data;
  }

  private static async tryToRequestGroupListFromAPI(useStableBranch: boolean, alert: boolean): Promise<Array<string>> {
    const route = this.createRouteForGroupListRequest(useStableBranch);
    const data: Promise<Array<string>> = await Axios.get(route)
      .then((response) => response.data)
      .catch((error) => {
        if (alert) {
          new ErrorResolver(error).alertAboutError();
        }
      });

    return data;
  }

  private static createRouteForGroupListRequest(useStableBranch: boolean): string {
    const routeFactory = new APIRequestFactory(useStableBranch, false);
    APILegacyRequestFactoryExtension.applyGroupsSearchRoutePath(routeFactory);

    const route = routeFactory.build();
    return route.toString();
  }
}
