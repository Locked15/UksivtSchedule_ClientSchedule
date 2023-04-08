export default class SearchModel {
  searchByTeachers: boolean;

  searchRequest: string;

  selectedGroups: string[];

  availableGroups: string[];

  constructor(
    searchRequest: string,
    searchByTeachers: boolean,
    selectedGroups: string[],
    availableGroups: string[],
  ) {
    this.searchRequest = searchRequest;
    this.searchByTeachers = searchByTeachers;
    this.selectedGroups = selectedGroups;
    this.availableGroups = availableGroups;
  }

  public static getDefaultModel(): SearchModel {
    return new SearchModel('', false, Array<string>(), Array<string>());
  }
}
