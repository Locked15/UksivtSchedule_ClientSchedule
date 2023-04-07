export default class APIBase {
  /**
   * Contains stable API release public address.
   * ? Can be used to generate queries to API.
   * @type {string} Address string.
   */
  static stableAPIAddress = 'http://localhost:5174';

  /**
   * Contains preview API release public address.
   * ? Can be used to generate queries to API.
   * @type {string} Address string.
   */
  static previewAPIAddress = 'http://localhost:5174';

  /**
   * Contains basic route to get access to API data functions.
   * ? Without this part of address, you can't generate queries to API.
   * @type {string} Address string.
   */
  static apiBasicRoute = 'api';
}
