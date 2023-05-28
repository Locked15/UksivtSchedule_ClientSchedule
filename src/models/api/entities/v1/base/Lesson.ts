import LegacyAPIEntitiesParent from '@/models/api/entities/v1/common/LegacyAPIEntitiesParent';

export default class Lesson extends LegacyAPIEntitiesParent {
  public number: number;

  public name: string;

  public teacher: string;

  public place: string;

  public changed: boolean;

  public hoursPassed: number | null;

  constructor(
    number: number,
    name: string,
    teacher: string,
    place: string,
    isChanged: boolean,
    hoursPassed: number | null,
  ) {
    super();

    this.number = number;
    this.name = name;
    this.teacher = teacher;
    this.place = place;
    this.changed = isChanged;
    this.hoursPassed = hoursPassed;
  }
}
