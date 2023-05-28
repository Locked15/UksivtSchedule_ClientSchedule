export default class APIRequest {
  public basicAddress: string;

  private addressAPIPart: string;

  public versionSelector: string;

  public controllerRoute: string[];

  private completeAddress: string;

  public constructor(
    basicAddress: string,
    addressAPIPart: string,
    versionSelector: string,
    controllerRoute: string[],
  ) {
    this.basicAddress = basicAddress;
    this.addressAPIPart = addressAPIPart;
    this.versionSelector = versionSelector;
    this.controllerRoute = controllerRoute;

    this.completeAddress = this.buildCompleteAddress();
  }

  private buildCompleteAddress() {
    let address = `${this.basicAddress}/${this.addressAPIPart}/${this.versionSelector}`;
    this.controllerRoute.forEach((addressPart) => {
      address = `${address}/${addressPart}`;
    });

    return address;
  }

  public toString(): string {
    return this.completeAddress;
  }
}
