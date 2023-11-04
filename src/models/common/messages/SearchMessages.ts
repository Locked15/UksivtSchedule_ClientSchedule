import Swal from 'sweetalert2';
import BaseMessage from '@/models/common/messages/base/BaseMessage';

export default class SearchMessages {
  public static readonly savedDataIsEmpty = new BaseMessage(
    'Сохранённые данные отсутствуют',
    'В локальном хранилище отсутствуют необходимые данные для работы. Подождите немного, пока будут получены данные с сервера.',
  );

  public static readonly emptySearchResult = new BaseMessage(
    'Ничего не найдено...',
    'По запросу ничего не найдено.\nПопробуйте изменить запрос.',
  );

  public static readonly teachersSearchNotYetImplemented = new BaseMessage(
    'Функция недоступна!',
    'К сожалению, на данный момент подключение API к БД не было реализовано до конца.\nЭто наложило определённые ограничения на функционал.',
  );

  public static readonly teachersSearchNotAvailableWithoutDB = new BaseMessage(
    'Уведомление',
    'Поиск по преподавателям недоступен без включённой опции использования базы данных.\nВключите её, чтобы выполнить запрос.',
  );

  private static readonly secretGroupMessage = new BaseMessage(
    'Никто не забыт.\nНичто не забыто.',
    'В один момент мы потеряли себя.\nСвою идентичность. Свою веру. Свою честь.\n\nНо мы выстояли.',
  );

  public static tryToShowSpecialMessageForGreatGood(loweredRequest: string): boolean {
    if (loweredRequest === '19п-5') {
      Swal.fire(this.secretGroupMessage.title, this.secretGroupMessage.message, 'info');
      return true;
    }

    return false;
  }
}
