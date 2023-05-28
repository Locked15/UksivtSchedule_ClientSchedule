/* eslint-disable vue/max-len */
import APIBase from '@/models/api/routes/base/APIBase';
import FinalScheduleAPIRoutes from '@/models/api/routes/v1/schedule/FinalScheduleAPIRoutes';
import FinalSchedule from '@/models/api/entities/v1/FinalSchedule';
import APIMessages from '@/models/common/messages/APIMessages';
import Axios from 'axios';
import Swal from 'sweetalert2';
import ScheduleRepository from '@/common/repository/base/ScheduleRepository';

export default class FinalScheduleRepository implements ScheduleRepository<FinalSchedule> {
  public useDbAsSource: boolean;

  public useStableBranch: boolean;

  public constructor(useDB: boolean, useStableBranch: boolean) {
    this.useDbAsSource = useDB;
    this.useStableBranch = useStableBranch;
  }

  public async getDataFromAPI(dayIndex: number, groupName: string, remainAttempts: number): Promise<FinalSchedule> {
    let attempts = remainAttempts;
    let data = await this.tryToGetDataFromAPI(dayIndex, groupName);
    while (data === undefined && attempts > 0) {
      attempts -= 1;
      // eslint-disable-next-line no-await-in-loop
      data = await this.tryToGetDataFromAPI(dayIndex, groupName);
    }

    return data;
  }

  public async tryToGetDataFromAPI(dayIndex: number, groupName: string): Promise<FinalSchedule> {
    const basicRoute = `${APIBase.apiBasicRoute}/${FinalScheduleAPIRoutes.FINAL_CONTROLLER}/${FinalScheduleAPIRoutes.DAY_ROUTE}`;
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