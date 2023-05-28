import BaseMessage from '@/models/common/messages/base/BaseMessage';

export default class ResultMessages {
  public static readonly ShowSelectionIsEmpty = new BaseMessage(
    'Внимание!',
    'На данный момент для отображения не выбран ни один день. Для получения сведения выберите хоть один.',
  );

  public static readonly ShowSelectionIsLarge = new BaseMessage(
    'Важно',
    'Вы выбрали для отображения больше 3 дней. При выполнении динамической выборки это может занять некоторое время.',
  );

  public static readonly SelectionByDateIsUnavailableOnNonDBSettings = new BaseMessage(
    'Настройка Недоступна',
    'Выборка по дате недоступна при динамическом получении данных. Отметьте базу данных в качестве источника данных для включения выборки по дате.',
  );
}
