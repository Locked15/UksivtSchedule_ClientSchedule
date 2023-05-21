/* eslint-disable vue/max-len */
import { SAVED_GROUPS_DATA } from '@/common/keys';
import StructureAPIRoutes from '@/models/api/routes/v1/other/StructureAPIRoutes';
import APIBase from '@/models/api/routes/base/APIBase';
import APIMessages from '@/models/common/messages/APIMessages';
import Axios from 'axios';
import Swal from 'sweetalert2';

export default class StructureRepository {
  /**
   * Begins a process of querying the API to get groups list.
   * Also, before requesting API checks local storage (and returns saved data, if it exists).
   *
   * @param useStableBranch Which API branch will be used to retrieve groups (Stable or Preview).
   * @param abortOnFailure Will error be return, if no awaitable response will be got. Otherwise, new requests will be made.
   *
   * @returns Promise of the String array with group names.
   */
  public static async getGroupsList(useStableBranch = true, abortOnFailure = false): Promise<Array<string>> {
    const savedStorageData = localStorage.getItem(SAVED_GROUPS_DATA);
    if (savedStorageData != null && savedStorageData.length > 0) {
      return JSON.parse(savedStorageData);
    }

    const data = this.getGroupsListFromAPI(useStableBranch, abortOnFailure);
    data.then((groups: string[]) => localStorage.setItem(SAVED_GROUPS_DATA, JSON.stringify(groups)));
    return data;
  }

  private static async getGroupsListFromAPI(useStableBranch: boolean, abortOnFailure: boolean): Promise<Array<string>> {
    const data = await this.tryToRequestGroupsListFromAPI(useStableBranch, abortOnFailure);
    if (data == null && !abortOnFailure) {
      return this.getGroupsListFromAPI(!useStableBranch, true);
    }

    return data;
  }

  private static async tryToRequestGroupsListFromAPI(useStableBranch: boolean, alert: boolean): Promise<Array<string>> {
    const basicRoute = `${APIBase.apiBasicRoute}/${StructureAPIRoutes.structureAPIRoute}/${StructureAPIRoutes.allGroupsRoute}`;
    const finalRoute = `${this.getSpecifiedAPIAddress(useStableBranch)}/${basicRoute}`;
    const data: Promise<Array<string>> = await Axios.get(finalRoute)
      .then((response) => response.data)
      .catch((error) => {
        if (alert) {
          if (error.response === undefined || error.response.status === undefined) {
            Swal.fire(APIMessages.APINotAvailable.title, APIMessages.APINotAvailable.message, 'error');
          } else {
            Swal.fire('Что-то пошло не так', error.response.data, 'error');
          }
        }
      });

    return data;
  }

  private static getSpecifiedAPIAddress(isStableBranch: boolean): string {
    const result = isStableBranch ? APIBase.stableAPIAddress : APIBase.previewAPIAddress;
    return result;
  }
}
