import Swal from 'sweetalert2';
import APIMessages from '@/models/common/messages/APIMessages';

export default class ErrorResolver {
  private error: any;

  private static isMessageShowsNow = false;

  public constructor(error: any) {
    this.error = error;
  }

  public alertAboutError() {
    if (ErrorResolver.isMessageShowsNow) return;

    ErrorResolver.isMessageShowsNow = true;
    if (!this.error.response || !this.error.response.status) {
      Swal.fire(APIMessages.APINotAvailable.title, APIMessages.APINotAvailable.message, 'error').then(() => {
        ErrorResolver.isMessageShowsNow = false;
      });
    } else {
      Swal.fire('Что-то пошло не так', this.error.response.data, 'error').then(() => {
        ErrorResolver.isMessageShowsNow = false;
      });
    }
  }
}
