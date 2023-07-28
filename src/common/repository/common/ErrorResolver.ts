import Swal from 'sweetalert2';
import APIMessages from '@/models/common/messages/APIMessages';

export default class ErrorResolver {
  private error: any;

  public constructor(error: any) {
    this.error = error;
  }

  public alertAboutError() {
    if (!this.error.response || !this.error.response.status) {
      Swal.fire(APIMessages.APINotAvailable.title, APIMessages.APINotAvailable.message, 'error');
    } else {
      Swal.fire('Что-то пошло не так', this.error.response.data, 'error');
    }
  }
}
