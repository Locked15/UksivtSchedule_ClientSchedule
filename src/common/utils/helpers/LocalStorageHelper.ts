import { SAVED_GROUPS_DATA, SAVED_TEACHERS_DATA } from '@/common/keys';

/* eslint-disable @typescript-eslint/no-unused-expressions */
function checkLocalStorageToContain(key: string): boolean {
  const value = localStorage.getItem(key);
  value !== null ? console.info(`Item ${key} is presented in Local Storage.`) : console.warn(`Item ${key} is missing in Local Storage`);

  return value !== null;
}

export function checkLocalStorageToContainGroupsData(): boolean {
  return checkLocalStorageToContain(SAVED_GROUPS_DATA);
}

export function checkLocalStorageToContainTeachersData(): boolean {
  return checkLocalStorageToContain(SAVED_TEACHERS_DATA);
}
