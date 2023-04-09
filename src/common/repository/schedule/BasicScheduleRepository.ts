/* eslint-disable vue/max-len */
import APIBase from '@/models/api/base/APIBase';
import ScheduleRepository from '@/common/repository/base/ScheduleRepository';
import BasicScheduleAPIRoutes from '@/models/api/schedule/BasicScheduleAPIRouters';
import ScheduleOfDay from '@/models/entities/ScheduleOfDay';
import APIMessages from '@/models/messages/APIMessages';
import Axios from 'axios';
import Swal from 'sweetalert2';

export default class BasicScheduleRepository implements ScheduleRepository<ScheduleOfDay> {
  public useDbAsSource: boolean;

  public useStableBranch: boolean;

  public constructor(useDb: boolean, useStableBranch: boolean) {
    this.useDbAsSource = useDb;
    this.useStableBranch = useStableBranch;
  }

  public async getDataFromAPI(dayIndex: number, groupName: string, remainAttempts: number): Promise<ScheduleOfDay> {
    let attempts = remainAttempts;
    let data = await this.tryToGetDataFromAPI(dayIndex, groupName);
    while (data == null && remainAttempts > 0) {
      attempts -= 1;

      // eslint-disable-next-line no-await-in-loop
      data = await this.getDataFromAPI(dayIndex, groupName, attempts);
    }

    return data;
  }

  public async tryToGetDataFromAPI(dayIndex: number, groupName: string): Promise<ScheduleOfDay> {
    const basicRoute = `${APIBase.apiBasicRoute}/${BasicScheduleAPIRoutes.SCHEDULE_ROUTE}/${BasicScheduleAPIRoutes.DAY_ROUTE}`;
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
