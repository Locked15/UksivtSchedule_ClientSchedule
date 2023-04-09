export default class SearchModel {
  searchByTeachers: boolean;

  searchRequest: string;

  selectedGroups: string[];

  constructor(
    searchRequest: string,
    searchByTeachers: boolean,
    selectedGroups: string[],
  ) {
    this.searchRequest = searchRequest;
    this.searchByTeachers = searchByTeachers;
    this.selectedGroups = selectedGroups;
  }

  public static getDefaultModel(): SearchModel {
    return new SearchModel('', false, Array<string>());
  }
}
