export default class BaseMessage {
  public readonly title: string;

  public readonly message: string;

  constructor(title: string, message: string) {
    this.title = title;
    this.message = message;
  }
}
