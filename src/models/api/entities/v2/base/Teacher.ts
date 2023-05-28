import ModernAPIEntitiesParent from '../common/ModernAPIEntitiesParent';

export default class Teacher extends ModernAPIEntitiesParent {
  public id: number;

  public name: string | null;

  public surname: string;

  public patronymic: string | null;

  public constructor(id: number, name: string | null, surname: string, patronymic: string | null) {
    super();

    this.id = id;
    this.name = name;
    this.surname = surname;
    this.patronymic = patronymic;
  }

  public static clone = (teacher: Teacher) => new Teacher(teacher.id, teacher.name, teacher.surname, teacher.patronymic);

  public override toString = () => `${this.surname} ${`${this.name}.` || ''} ${`${this.patronymic}.` || ''}`;
}
