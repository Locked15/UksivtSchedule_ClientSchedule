/* eslint-disable no-await-in-loop, no-param-reassign */
import DateWorker from '@/common/utils/workers/DateWorker';
import APIRequestFactory from '@/models/api/connection/APIRequestFactory';
import APIModernRequestFactoryExtension from '@/models/api/connection/extensions/APIModernRequestFactoryExtension';
import TeacherScheduleWrapper from '@/models/api/entities/v2/wrappers/TeacherScheduleWrapper';
import GroupFinalScheduleWrapper from '@/models/api/entities/v2/wrappers/group/GroupFinalScheduleWrapper';
import Axios from 'axios';

import IModernScheduleRepository from '../../base/IModernScheduleRepository';
import ErrorResolver from '../../common/ErrorResolver';
import { addModernMark } from '../../common/MarkHelper';
import { getLessonTargetHoursForModernEntity } from '../../common/LessonHoursHelper';

export default class FinalScheduleRepository implements IModernScheduleRepository<GroupFinalScheduleWrapper, TeacherScheduleWrapper> {
  public useStableBranch: boolean;

  public constructor(useStableBranch: boolean) {
    this.useStableBranch = useStableBranch;
  }

  public async getDataFromAPIForGroup(targetGroup: string, targetDate: Date, remainAttempts: number): Promise<GroupFinalScheduleWrapper> {
    let attempts = remainAttempts;
    let data = await this.tryToGetDataFromAPIForGroup(targetGroup, targetDate);
    while (data === undefined && attempts > 0) {
      data = await this.tryToGetDataFromAPIForGroup(targetGroup, targetDate);
      attempts -= 1;
    }

    addModernMark(data);
    data.lessonsInfo.forEach((lesson) => {
      lesson.lessonTargetHours = getLessonTargetHoursForModernEntity(lesson.lessonNumber ?? -1, targetGroup, targetDate);
    });

    return data;
  }

  public async tryToGetDataFromAPIForGroup(targetGroup: string, targetDate: Date): Promise<GroupFinalScheduleWrapper> {
    const route = FinalScheduleRepository.createRouteForGroupFinalScheduleRequest(this.useStableBranch);
    const data = await Axios.get(route, {
      params: {
        targetGroup,
        targetDate: DateWorker.getRequestVariantForDate(targetDate),
      },
    })
      .then((response) => response.data)
      .catch((error) => new ErrorResolver(error).alertAboutError());

    return data;
  }

  private static createRouteForGroupFinalScheduleRequest(useStableBranch: boolean): string {
    const routeFactory = new APIRequestFactory(useStableBranch, true);
    APIModernRequestFactoryExtension.applyFinalScheduleForGroupRoutePath(routeFactory, true, true);

    const route = routeFactory.build();
    return route.toString();
  }

  public async getDataFromAPIForTeacher(teacherId: number, targetDate: Date, remainAttempts: number): Promise<TeacherScheduleWrapper> {
    let attempts = remainAttempts;
    let data = await this.tryToGetDataFromAPIForTeacher(teacherId, targetDate);
    while (data === undefined && attempts > 0) {
      // eslint-disable-next-line no-await-in-loop
      data = await this.tryToGetDataFromAPIForTeacher(teacherId, targetDate);
      attempts -= 1;
    }

    addModernMark(data);
    data.lessonsInfo.forEach((lesson) => {
      lesson.lessonTargetHours = getLessonTargetHoursForModernEntity(lesson.lessonNumber ?? -1, lesson.lessonGroup ?? '19П-3', targetDate);
    });

    return data;
  }

  public async tryToGetDataFromAPIForTeacher(teacherId: number, targetDate: Date): Promise<TeacherScheduleWrapper> {
    const route = FinalScheduleRepository.createRouteForTeacherFinalScheduleRequest(this.useStableBranch);
    const data = await Axios.get(route, {
      params: {
        teacherId,
        targetDate: DateWorker.getRequestVariantForDate(targetDate),
      },
    })
      .then((response) => response.data)
      .catch((error) => new ErrorResolver(error).alertAboutError());

    return data;
  }

  private static createRouteForTeacherFinalScheduleRequest(useStableBranch: boolean): string {
    const routeFactory = new APIRequestFactory(useStableBranch, true);
    APIModernRequestFactoryExtension.applyFinalScheduleForTeacherRoutePath(routeFactory, true, true);

    const route = routeFactory.build();
    return route.toString();
  }
}
