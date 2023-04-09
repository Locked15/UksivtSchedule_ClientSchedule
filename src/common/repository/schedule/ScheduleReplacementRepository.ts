/* eslint-disable vue/max-len */
import ScheduleRepository from '@/common/repository/base/ScheduleRepository';
import APIBase from '@/models/api/base/APIBase';
import ScheduleReplacementsAPIRoutes from '@/models/api/schedule/ScheduleReplacementsAPIRoutes';
import ScheduleReplacement from '@/models/entities/ScheduleReplacement';
import APIMessages from '@/models/messages/APIMessages';
import Axios from 'axios';
import Swal from 'sweetalert2';

export default class ScheduleReplacementsRepository implements ScheduleRepository<ScheduleReplacement> {
  public useDbAsSource: boolean;

  public useStableBranch: boolean;

  public constructor(useDb: boolean, useStableBranch: boolean) {
    this.useDbAsSource = useDb;
    this.useStableBranch = useStableBranch;
  }

  public async getDataFromAPI(dayIndex: number, groupName: string, remainAttempts: number): Promise<ScheduleReplacement> {
    let data = await this.tryToGetDataFromAPI(dayIndex, groupName);
    while (data == null && remainAttempts > 0) {
      // eslint-disable-next-line no-await-in-loop
      data = await this.getDataFromAPI(dayIndex, groupName, remainAttempts - 1);
    }

    return data;
  }

  public async tryToGetDataFromAPI(dayIndex: number, groupName: string): Promise<ScheduleReplacement> {
    const basicRoute = `${APIBase.apiBasicRoute}/${ScheduleReplacementsAPIRoutes.REPLACEMENTS_CONTROLLER}/${ScheduleReplacementsAPIRoutes.DAY_ROUTE}`;
    const finalRoute = `${this.getSpecifiedAPIAddress()}/${basicRoute}`;
    const data = await Axios.get(finalRoute, {
      params: {
        dayIndex,
        groupName,
      },
    })
      .then((response) => response.data)
      .catch((error) => {
        if (error.response === undefined || error.response.status === undefined) {
          Swal.fire(APIMessages.APINotAvailable.title, APIMessages.APINotAvailable.message, 'error');
        } else {
          Swal.fire('Что-то пошло не так', error.response.data, 'error');
        }
      });

    return data;
  }

  private getSpecifiedAPIAddress(): string {
    if (this.useStableBranch) {
      return APIBase.stableAPIAddress;
    }

    return APIBase.previewAPIAddress;
  }
}
