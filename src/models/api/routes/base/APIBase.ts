export default class APIBase {
  /**
   * Contains stable API release public address.
   * ? Can be used to generate queries to API.
   */
  public static readonly STABLE_API_ADDRESS = 'https://uksivt.info';

  /**
   * Contains preview API release public address.
   * ? Can be used to generate queries to API.
   */
  public static readonly PREVIEW_API_ADDRESS = 'https://uksivt.azurewebsites.net';

  /**
   * Contains basic route to get access to API data functions.
   * ? Without this part of address, you can't generate queries to API.
   */
  public static readonly API_BASIC_ROUTE = 'api';

  /**
   * Contains suffix part of API route.
   * This routes to legacy controllers and actions.
   */
  public static readonly LEGACY_API_ROUTE = 'v1';

  /**
   * Contains suffix part of API route.
   * This routes to modern controllers and actions.
   */
  public static readonly MODERN_API_ROUTE = 'v2';
}
