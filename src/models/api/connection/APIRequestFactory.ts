import APIBase from '@/models/api/routes/base/APIBase';
import APIRequest from '@/models/api/connection/APIRequest';

export default class APIRequestFactory {
  private apiAddress: string;

  private apiSuffix: string;

  private apiVersion: string;

  private addressParts: string[];

  public constructor(useStableBranch: boolean, useDb: boolean) {
    this.apiAddress = useStableBranch ? APIBase.STABLE_API_ADDRESS : APIBase.PREVIEW_API_ADDRESS;
    this.apiVersion = useDb ? APIBase.MODERN_API_ROUTE : APIBase.LEGACY_API_ROUTE;
    this.apiSuffix = APIBase.API_BASIC_ROUTE;
    this.addressParts = new Array<string>();
  }

  public applyPaths(addresses: string[]): APIRequestFactory {
    this.addressParts = addresses;
    return this;
  }

  public build(): APIRequest {
    return new APIRequest(this.apiAddress, this.apiSuffix, this.apiVersion, this.addressParts);
  }
}
