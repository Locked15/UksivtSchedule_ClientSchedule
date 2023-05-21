export default class APIBase {
  /**
   * Contains stable API release public address.
   * ? Can be used to generate queries to API.
   *
   * @type {string} Address string.
   */
  static stableAPIAddress = 'https://uksivt.info';

  /**
   * Contains preview API release public address.
   * ? Can be used to generate queries to API.
   *
   * @type {string} Address string.
   */
  static previewAPIAddress = 'https://uksivt.azurewebsites.net';

  /**
   * Contains basic route to get access to API data functions.
   * ? Without this part of address, you can't generate queries to API.
   *
   * @type {string} Address string.
   */
  static apiBasicRoute = 'api';

  /**
   * Contains suffix part of API route.
   * This routes to legacy controllers and actions.
   *
   * @type {string} Address string.
   */
  static legacyAPIRoute = 'v1';

  /**
   * Contains suffix part of API route.
   * This routes to modern controllers and actions.
   *
   * @type {string} Address string.
   */
  static modernAPIRoute = 'v2';
}
