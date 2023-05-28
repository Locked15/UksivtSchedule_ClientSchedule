/* eslint-disable vue/max-len */
import APISubRoutes from '../../routes/base/APISubRoutes';
import ModernAPIGeneralRoutes from '../../routes/v2/other/ModernAPIGeneralRoutes';
import ModernAPIScheduleRoutes from '../../routes/v2/schedule/ModernAPIScheduleRoutes';
import APIRequestFactory from '../APIRequestFactory';

export default class APIModernRequestFactoryExtension {
  public static applyBasicScheduleForGroupRoutePath(factory: APIRequestFactory, forSingleDay: boolean, forTargetDate: boolean): APIRequestFactory {
    factory.applyPaths([
      APISubRoutes.SCHEDULE_SUB_ROUTE,
      ModernAPIScheduleRoutes.BASIC_SCHEDULE_CONTROLLER,
      ModernAPIScheduleRoutes.GROUP_SELECTOR,
      forSingleDay ? ModernAPIScheduleRoutes.DAY_SELECTOR : ModernAPIScheduleRoutes.WEEK_SELECTOR,
      forTargetDate ? ModernAPIScheduleRoutes.GROUP_DATE_TYPE_SELECTOR : '',
    ]);
    return factory;
  }

  public static applyReplacementsForGroupRoutePath(factory: APIRequestFactory, forSingleDay: boolean, forTargetDate: boolean): APIRequestFactory {
    factory.applyPaths([
      APISubRoutes.SCHEDULE_SUB_ROUTE,
      ModernAPIScheduleRoutes.SCHEDULE_REPLACEMENTS_CONTROLLER,
      ModernAPIScheduleRoutes.GROUP_SELECTOR,
      forSingleDay ? ModernAPIScheduleRoutes.DAY_SELECTOR : ModernAPIScheduleRoutes.WEEK_SELECTOR,
      forTargetDate ? ModernAPIScheduleRoutes.GROUP_DATE_TYPE_SELECTOR : '',
    ]);
    return factory;
  }

  public static applyFinalScheduleForGroupRoutePath(factory: APIRequestFactory, forSingleDay: boolean, forTargetDate: boolean): APIRequestFactory {
    factory.applyPaths([
      APISubRoutes.SCHEDULE_SUB_ROUTE,
      ModernAPIScheduleRoutes.FINAL_SCHEDULE_CONTROLLER,
      ModernAPIScheduleRoutes.GROUP_SELECTOR,
      forSingleDay ? ModernAPIScheduleRoutes.DAY_SELECTOR : ModernAPIScheduleRoutes.WEEK_SELECTOR,
      forTargetDate ? ModernAPIScheduleRoutes.GROUP_DATE_TYPE_SELECTOR : '',
    ]);
    return factory;
  }

  public static applyBasicScheduleForTeacherRoutePath(factory: APIRequestFactory, forSingleDay: boolean, forTargetDate: boolean): APIRequestFactory {
    factory.applyPaths([
      APISubRoutes.SCHEDULE_SUB_ROUTE,
      ModernAPIScheduleRoutes.BASIC_SCHEDULE_CONTROLLER,
      ModernAPIScheduleRoutes.TEACHER_SELECTOR,
      forSingleDay ? ModernAPIScheduleRoutes.DAY_SELECTOR : ModernAPIScheduleRoutes.WEEK_SELECTOR,
      forTargetDate ? ModernAPIScheduleRoutes.TEACHER_DATE_TYPE_SELECTOR : ModernAPIScheduleRoutes.TEACHER_DAY_INDEX_TYPE_SELECTOR,
    ]);
    return factory;
  }

  public static applyReplacementsForTeacherRoutePath(factory: APIRequestFactory, forSingleDay: boolean, forTargetDate: boolean): APIRequestFactory {
    factory.applyPaths([
      APISubRoutes.SCHEDULE_SUB_ROUTE,
      ModernAPIScheduleRoutes.SCHEDULE_REPLACEMENTS_CONTROLLER,
      ModernAPIScheduleRoutes.TEACHER_SELECTOR,
      forSingleDay ? ModernAPIScheduleRoutes.DAY_SELECTOR : ModernAPIScheduleRoutes.WEEK_SELECTOR,
      forTargetDate ? ModernAPIScheduleRoutes.TEACHER_DATE_TYPE_SELECTOR : ModernAPIScheduleRoutes.TEACHER_DAY_INDEX_TYPE_SELECTOR,
    ]);
    return factory;
  }

  public static applyFinalScheduleForTeacherRoutePath(factory: APIRequestFactory, forSingleDay: boolean, forTargetDate: boolean): APIRequestFactory {
    factory.applyPaths([
      APISubRoutes.SCHEDULE_SUB_ROUTE,
      ModernAPIScheduleRoutes.FINAL_SCHEDULE_CONTROLLER,
      ModernAPIScheduleRoutes.TEACHER_SELECTOR,
      forSingleDay ? ModernAPIScheduleRoutes.DAY_SELECTOR : ModernAPIScheduleRoutes.WEEK_SELECTOR,
      forTargetDate ? ModernAPIScheduleRoutes.TEACHER_DATE_TYPE_SELECTOR : ModernAPIScheduleRoutes.TEACHER_DAY_INDEX_TYPE_SELECTOR,
    ]);
    return factory;
  }

  public static applyTeacherSearchForRoutePath(factory: APIRequestFactory, selectAllTeachers: boolean): APIRequestFactory {
    factory.applyPaths([
      APISubRoutes.GENERAL_SUB_ROUTE,
      ModernAPIGeneralRoutes.SEARCH_CONTROLLER,
      ModernAPIGeneralRoutes.TEACHERS_SEARCH,
      selectAllTeachers ? ModernAPIGeneralRoutes.SUMMARY_ACTION : '',
    ]);
    return factory;
  }
}
