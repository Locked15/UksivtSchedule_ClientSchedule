import BaseMessage from '@/models/common/messages/base/BaseMessage';

export default class UserMessages {
  public static readonly UserNotFound = new BaseMessage(
    'Пользователь не найден!',
    'Пользовательские данные не обнаружены.\nБудут сгенерированы новые.',
  );
}
