/* eslint-disable no-await-in-loop, no-param-reassign */
import Axios from 'axios';
import DateWorker from '@/common/utils/workers/DateWorker';
import APIRequestFactory from '@/models/api/connection/APIRequestFactory';
import APIModernRequestFactoryExtension from '@/models/api/connection/extensions/APIModernRequestFactoryExtension';
import TeacherScheduleWrapper from '@/models/api/entities/v2/wrappers/TeacherScheduleWrapper';
import GroupScheduleReplacementWrapper from '@/models/api/entities/v2/wrappers/group/GroupScheduleReplacementWrapper';

import IModernScheduleRepository from '../../base/IModernScheduleRepository';
import ErrorResolver from '../../common/ErrorResolver';
import { getLessonTargetHoursForModernEntity } from '../../common/LessonHoursHelper';
import { addModernMark } from '../../common/MarkHelper';

export default class ScheduleReplacementRepository implements IModernScheduleRepository<GroupScheduleReplacementWrapper, TeacherScheduleWrapper> {
  public useStableBranch: boolean;

  public constructor(useStableBranch: boolean) {
    this.useStableBranch = useStableBranch;
  }

  public async getDataFromAPIForGroup(targetGroup: string, targetDate: Date, remainAttempts: number): Promise<GroupScheduleReplacementWrapper> {
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

  public async tryToGetDataFromAPIForGroup(targetGroup: string, targetDate: Date): Promise<GroupScheduleReplacementWrapper> {
    const route = ScheduleReplacementRepository.createRouteForGroupScheduleReplacementRequest(this.useStableBranch);
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

  private static createRouteForGroupScheduleReplacementRequest(useStableBranch: boolean) {
    const routeFactory = new APIRequestFactory(useStableBranch, true);
    APIModernRequestFactoryExtension.applyReplacementsForGroupRoutePath(routeFactory, true, true);

    const route = routeFactory.build();
    return route.toString();
  }

  public async getDataFromAPIForTeacher(teacherId: number, targetDate: Date, remainAttempts: number): Promise<TeacherScheduleWrapper> {
    let attempts = remainAttempts;
    let data = await this.tryToGetDataFromAPIForTeacher(teacherId, targetDate);
    while (data === undefined && attempts > 0) {
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
    const route = ScheduleReplacementRepository.createRouteForTeacherScheduleReplacementRequest(this.useStableBranch);
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

  private static createRouteForTeacherScheduleReplacementRequest(useStableBranch: boolean) {
    const routeFactory = new APIRequestFactory(useStableBranch, true);
    APIModernRequestFactoryExtension.applyReplacementsForTeacherRoutePath(routeFactory, true, true);

    const route = routeFactory.build();
    return route.toString();
  }
}
