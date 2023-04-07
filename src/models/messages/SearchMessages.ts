import Swal from 'sweetalert2';

export default class SearchMessages {
  public static readonly EmptySearchResultTitle = 'Ничего не найдено...';

  public static readonly EmptySearchResultMessage = 'По Вашему поисковому запросу ничего не найдено.\nПопробуйте изменить поисковый запрос.';

  public static tryToShowSpecialMessageForGreatGood(loweredRequest: string): boolean {
    if (loweredRequest === '19п-5') {
      Swal.fire(
        'Никто не забыт.\nНичто не забыто.',
        'В один момент мы потеряли себя.\nСвою идентичность. Свою веру. Свою честь.\n\nНо мы выстояли.',
        'info',
      );
      return true;
    }

    return false;
  }
}
