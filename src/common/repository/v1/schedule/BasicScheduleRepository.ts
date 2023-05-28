/* eslint-disable vue/max-len */
import APIBase from '@/models/api/routes/base/APIBase';
import ScheduleRepository from '@/common/repository/base/ScheduleRepository';
import BasicScheduleAPIRoutes from '@/models/api/routes/v1/schedule/BasicScheduleAPIRouters';
import BasicSchedule from '@/models/api/entities/v1/BasicSchedule';
import APIMessages from '@/models/common/messages/APIMessages';
import Axios from 'axios';
import Swal from 'sweetalert2';

export default class BasicScheduleRepository implements ScheduleRepository<BasicSchedule> {
  public useDbAsSource: boolean;

  public useStableBranch: boolean;

  public constructor(useDb: boolean, useStableBranch: boolean) {
    this.useDbAsSource = useDb;
    this.useStableBranch = useStableBranch;
  }

  public async getDataFromAPI(dayIndex: number, groupName: string, remainAttempts: number): Promise<BasicSchedule> {
    let attempts = remainAttempts;
    let data = await this.tryToGetDataFromAPI(dayIndex, groupName);
    while (data === undefined && attempts > 0) {
      attempts -= 1;
      // eslint-disable-next-line no-await-in-loop
      data = await this.tryToGetDataFromAPI(dayIndex, groupName);
    }

    return data;
  }

  public async tryToGetDataFromAPI(dayIndex: number, groupName: string): Promise<BasicSchedule> {
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