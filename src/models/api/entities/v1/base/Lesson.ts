import ILegacyAPIEntitiesParent from '@/models/api/entities/v1/common/ILegacyAPIEntitiesParent';

export default class Lesson implements ILegacyAPIEntitiesParent {
  Number: number;

  Name: string;

  Teacher: string;

  Place: string;

  Changed: boolean;

  HoursPassed: number | null;

  constructor(
    number: number,
    name: string,
    teacher: string,
    place: string,
    isChanged: boolean,
    hoursPassed: number | null,
  ) {
    this.Number = number;
    this.Name = name;
    this.Teacher = teacher;
    this.Place = place;
    this.Changed = isChanged;
    this.HoursPassed = hoursPassed;
  }
}
