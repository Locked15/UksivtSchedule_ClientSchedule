import LegacyAPIEntitiesParent from '@/models/api/entities/v1/common/LegacyAPIEntitiesParent';

export default class Lesson extends LegacyAPIEntitiesParent {
  public number: number;

  public name: string;

  public teacher: string;

  public place: string;

  public changed: boolean;

  constructor(
    number: number,
    name: string,
    teacher: string,
    place: string,
    isChanged: boolean,
  ) {
    super();

    this.number = number;
    this.name = name;
    this.teacher = teacher;
    this.place = place;
    this.changed = isChanged;
  }
}
