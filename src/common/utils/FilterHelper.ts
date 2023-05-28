import Lesson from '@/models/api/entities/v1/base/Lesson';
import GroupLesson from '@/models/api/entities/v2/GroupLesson';
import TeacherLesson from '@/models/api/entities/v2/TeacherLesson';
import Teacher from '@/models/api/entities/v2/base/Teacher';

type TeacherSearchData = {
  name: string;
  surname: string;
  patronymic: string;
};

function getAtomicDataForTeacherFromRequest(requestString: string): TeacherSearchData {
  const splitData = requestString.trim().replace(/\s+/g, ' ').split(' ');

  const possibleName = splitData.length > 1 ? splitData[1][0] : '';
  const possibleSurname = splitData.length > 0 ? splitData[0] : '';
  const possiblePatronymic = splitData.length > 2 ? splitData[2][0] : '';

  return {
    name: possibleName,
    surname: possibleSurname,
    patronymic: possiblePatronymic,
  };
}

export function compareTeacherData(teacher: Teacher, requestString: string): boolean {
  const atomicRequestData = getAtomicDataForTeacherFromRequest(requestString);

  const isNameContained = teacher.name?.toLowerCase().includes(atomicRequestData.name.toLowerCase()) || false;
  const isSurnameContained = teacher.surname.toLowerCase().includes(atomicRequestData.surname.toLowerCase());
  const isPatronymicContained = teacher.patronymic?.toLowerCase().includes(atomicRequestData.patronymic.toLowerCase()) || false;

  return isNameContained && isSurnameContained && isPatronymicContained;
}

export function compareGroupData(group: string, requestString: string): boolean {
  const loweredGroupName = group.toLowerCase();
  const loweredRequest = requestString.trim().toLowerCase();

  return loweredGroupName.includes(loweredRequest);
}

export function checkLegacyLessonIsActual(lesson: Lesson): boolean {
  const lessonNameIsNotNull = lesson?.name != null || false;
  const lessonNameIsNotEmpty = lesson?.name !== '' || false;

  return lessonNameIsNotNull && lessonNameIsNotEmpty;
}

export function checkModernGroupLessonIsActual(lesson: GroupLesson): boolean {
  const lessonNameIsNotNull = lesson?.lessonName != null || false;
  const lessonNameIsNotEmpty = lesson?.lessonName !== '' || false;

  return lessonNameIsNotNull && lessonNameIsNotEmpty;
}

export function checkModernTeacherLessonIsActual(lesson: TeacherLesson): boolean {
  const lessonNameIsNotNull = lesson?.lessonName != null || false;
  const lessonNameIsNotEmpty = lesson?.lessonName !== '' || false;

  return lessonNameIsNotNull && lessonNameIsNotEmpty;
}
