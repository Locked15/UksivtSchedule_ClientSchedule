import { POSITION } from 'vue-toastification';
import { ToastOptions } from 'vue-toastification/dist/types/types';

export default class ToastConfiguration {
  public static readonly nothingIsFoundToastConfiguration: ToastOptions = {
    position: POSITION.BOTTOM_LEFT,
    timeout: 4000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: true,
    closeButton: 'button',
    icon: {
      iconClass: 'material-icons',
      iconChildren: 'search_off',
      iconTag: 'span',
    },
    rtl: false,
  };

  public static readonly userSettingsNotFoundToastConfiguration: ToastOptions = {
    position: POSITION.BOTTOM_CENTER,
    timeout: 4000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: true,
    closeButton: 'button',
    icon: {
      iconClass: 'material-icons',
      iconChildren: 'group_add',
      iconTag: 'span',
    },
    rtl: false,
  };
}
