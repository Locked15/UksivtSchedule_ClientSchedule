import BaseMessage from '@/models/messages/base/BaseMessage';

export default class APIMessages {
  public static readonly UserNotFound = new BaseMessage(
    'Пользователь не найден!',
    'Пользовательские данные не обнаружены.\nБудут сгенерированы новые.',
  );
}
