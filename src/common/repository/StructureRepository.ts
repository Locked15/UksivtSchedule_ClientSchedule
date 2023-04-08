import StructureAPIRoutes from '@/models/api/StructureAPIRoutes';
import APIBase from '@/models/api/base/APIBase';
import APIMessages from '@/models/messages/APIMessages';
import Axios from 'axios';
import Swal from 'sweetalert2';

export default class StructureRepository {
  private useStableBranch: boolean;

  constructor(useStable: boolean) {
    this.useStableBranch = useStable;
  }

  public async getGroupsList(limit = false): Promise<Array<string>> {
    // ToDO: Make local source reading.
    const data = await this.getGroupsListFromAPI();

    if (data == null && !limit) {
      const useStable = this.useStableBranch;
      return new StructureRepository(!useStable).getGroupsList(true);
    }
    return data;
  }

  private async getGroupsListFromAPI(): Promise<Array<string>> {
    const basicRoute = `${APIBase.apiBasicRoute}/${StructureAPIRoutes.structureAPIRoute}/${StructureAPIRoutes.allGroupsRoute}`;
    const finalRoute = `${this.getSpecifiedAPIAddress()}/${basicRoute}`;
    const data: Promise<Array<string>> = await Axios.get(finalRoute)
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
