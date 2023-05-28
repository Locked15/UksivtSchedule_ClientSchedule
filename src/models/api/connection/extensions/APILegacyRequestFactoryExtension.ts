/* eslint-disable vue/max-len */
import APISubRoutes from '../../routes/base/APISubRoutes';
import StructureAPIRoutes from '../../routes/v1/other/StructureAPIRoutes';
import BasicScheduleAPIRoutes from '../../routes/v1/schedule/BasicScheduleAPIRoutes';
import FinalScheduleAPIRoutes from '../../routes/v1/schedule/FinalScheduleAPIRoutes';
import ScheduleReplacementsAPIRoutes from '../../routes/v1/schedule/ScheduleReplacementsAPIRoutes';
import APIRequestFactory from '../APIRequestFactory';

export default class APILegacyRequestFactoryExtension {
  public static applyGroupsSearchRoutePath(factory: APIRequestFactory): APIRequestFactory {
    factory.applyPaths([
      APISubRoutes.GENERAL_SUB_ROUTE,
      StructureAPIRoutes.STRUCTURE_CONTROLLER,
      StructureAPIRoutes.ALL_GROUPS_ROUTE,
    ]);
    return factory;
  }

  public static applyBasicScheduleRoutePath(factory: APIRequestFactory, forSingleDay = true): APIRequestFactory {
    factory.applyPaths([
      APISubRoutes.SCHEDULE_SUB_ROUTE,
      BasicScheduleAPIRoutes.SCHEDULE_CONTROLLER,
      forSingleDay ? BasicScheduleAPIRoutes.DAY_ROUTE : BasicScheduleAPIRoutes.WEEK_ROUTE,
    ]);
    return factory;
  }

  public static applyReplacementsRoutePath(factory: APIRequestFactory, forSingleDay = true): APIRequestFactory {
    factory.applyPaths([
      APISubRoutes.SCHEDULE_SUB_ROUTE,
      ScheduleReplacementsAPIRoutes.REPLACEMENTS_CONTROLLER,
      forSingleDay ? ScheduleReplacementsAPIRoutes.DAY_ROUTE : ScheduleReplacementsAPIRoutes.WEEK_ROUTE,
    ]);
    return factory;
  }

  public static applyFinalScheduleRoutePath(factory: APIRequestFactory, forSingleDay = true): APIRequestFactory {
    factory.applyPaths([
      APISubRoutes.SCHEDULE_SUB_ROUTE,
      FinalScheduleAPIRoutes.FINAL_CONTROLLER,
      forSingleDay ? FinalScheduleAPIRoutes.DAY_ROUTE : FinalScheduleAPIRoutes.WEEK_ROUTE,
    ]);
    return factory;
  }
}
