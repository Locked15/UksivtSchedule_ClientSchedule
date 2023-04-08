import BaseMessage from './base/BaseMessage';

export default class APIMessages {
  public static readonly APINotAvailable = new BaseMessage(
    'Ох, похоже API недоступна!',
    'Пожалуйста, сохраняйте спокойствие и немного подождите.\n\nЕсли проблема сохраняется долгое время, свяжитесь с автором.',
  );
}
