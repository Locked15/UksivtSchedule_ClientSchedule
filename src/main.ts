import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from '@/App.vue';
import router from '@/common/router';
import store from '@/common/store';
import SearchComponent from '@/components/common/search/SearchComponent.vue';
import ApplicationThemes from '@/models/common/themes/ApplicationThemes';
import '@mdi/font/css/materialdesignicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@vuepic/vue-datepicker/dist/main.css';

/**
 * Generates new instance of Vuetify component settings and injects it into Application instance.
 * @returns Vuetify instance. Set type to 'Any' because I don't sure about this.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateVuetifyInstance(): any {
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
          dark: ApplicationThemes.azureColorTheme.isDarkTheme,
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

const app = createApp(App);
app.use(store);
app.use(router);
app.use(generateVuetifyInstance());

app.component('SearchComponent', SearchComponent);

app.mount('#app');
