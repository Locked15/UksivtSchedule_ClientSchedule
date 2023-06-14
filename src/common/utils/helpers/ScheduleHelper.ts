export function getBeginningOfTeachingYear(): Date {
  const date = new Date();
  if (date.getMonth() < 6) date.setFullYear(date.getFullYear() - 1);
  return date;
}

export function extractYearFromGroupName(groupName: string): number {
  const matches = groupName.match(/^\d+/);
  return matches ? Number(matches[0]) : -1;
}

export function getCourseFromGroupName(groupName: string) {
  const teachingYearBeginning = getBeginningOfTeachingYear();
  return teachingYearBeginning.getFullYear() - (extractYearFromGroupName(groupName) + 1999);
}
