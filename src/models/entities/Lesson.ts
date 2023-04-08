export default class Lesson {
  /**
   * ! Unique ID for the got lesson.
   * Must be used inside foreign keys.
   */
  id: number;

  name: string;

  teacher: string;

  place: string;

  isChanged: boolean;

  constructor(id: number, name: string, teacher: string, place: string, isChanged: boolean) {
    this.id = id;
    this.name = name;
    this.teacher = teacher;
    this.place = place;
    this.isChanged = isChanged;
  }
}
