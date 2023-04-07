export default class SearchModel {
  searchRequest: string;

  selectedGroups: string[];

  availableGroups: string[];

  constructor(searchRequest: string, selectedGroups: string[], availableGroups: string[]) {
    this.searchRequest = searchRequest;
    this.selectedGroups = selectedGroups;
    this.availableGroups = availableGroups;
  }

  public static getDefaultModel() : SearchModel {
    return new SearchModel('', Array<string>(), Array<string>());
  }
}
