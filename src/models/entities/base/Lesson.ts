export default class Lesson {
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
