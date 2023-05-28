export default class SearchModel {
  searchByTeachers: boolean;

  searchRequest: string;

  availableVariants: any[];

  constructor(
    searchRequest: string,
    searchByTeachers: boolean,
    availableVariants: string[],
  ) {
    this.searchRequest = searchRequest;
    this.searchByTeachers = searchByTeachers;
    this.availableVariants = availableVariants;
  }

  public static getDefaultModel(): SearchModel {
    return new SearchModel('', false, Array<string>());
  }
}
