import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from '@/App.vue';
import router from '@/common/router';
import store from '@/common/store';
import ApplicationThemes from '@/models/common/themes/ApplicationThemes';
import '@mdi/font/css/materialdesignicons.css';
import '@vuepic/vue-datepicker/dist/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue';
import Toast, { PluginOptions as ToastifyPluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { createVuetify } from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

/**
 * Generates new instance of Vuetify component settings and injects it into Application instance.
 * @returns Vuetify instance. Set type to 'Any' because I don't sure about this.
 */
function createVuetifyInstance(): any {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      themes: {
        Azure: {
          dark: ApplicationThemes.azureColorTheme.isDarkTheme,
          colors: {
            primary: ApplicationThemes.azureColorTheme.primaryColor,
            secondary: ApplicationThemes.azureColorTheme.secondaryColor,
            background: ApplicationThemes.azureColorTheme.backgroundColor,
            surface: ApplicationThemes.azureColorTheme.surfaceColor,
            error: ApplicationThemes.azureColorTheme.errorColor,
            grey: ApplicationThemes.azureColorTheme.grayColor,
          },
        },
        Gray: {
          dark: ApplicationThemes.darkColorTheme.isDarkTheme,
          colors: {
            primary: ApplicationThemes.darkColorTheme.primaryColor,
            secondary: ApplicationThemes.darkColorTheme.secondaryColor,
            accent: ApplicationThemes.darkColorTheme.accentColor,
            background: ApplicationThemes.darkColorTheme.backgroundColor,
            surface: ApplicationThemes.darkColorTheme.surfaceColor,
            grey: ApplicationThemes.darkColorTheme.grayColor,
          },
        },
      },
    },
  });

  return vuetify;
}

function createVueToastifyConfigInstance(): ToastifyPluginOptions {
  const config = {
    transition: 'Vue-Toastification__fade',
    maxToasts: 2,
    newestOnTop: true,
    filterBeforeCreate: (toast: any, toasts: any[]) => {
      if (toasts.filter((t) => t.type === toast.type).length !== 0) return false;
      return toast;
    },
  };
  return config;
}

const app = createApp(App);
app.use(store);
app.use(router);
app.use(createVuetifyInstance());
app.use(Toast, createVueToastifyConfigInstance());

app.mount('#app');
