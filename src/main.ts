import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import App from './App.vue';
import router from './common/router';
import store from './common/store';
import ApplicationSettings from './common/ApplicationSettings';

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
          colors: {
            primary: ApplicationSettings.azureColorTheme.primaryColor,
            secondary: ApplicationSettings.azureColorTheme.secondaryColor,
            background: ApplicationSettings.azureColorTheme.backgroundColor,
            surface: ApplicationSettings.azureColorTheme.surfaceColor,
            error: ApplicationSettings.azureColorTheme.errorColor,
          },
        },
        Gray: {
          colors: {
            primary: ApplicationSettings.darkColorTheme.primaryColor,
            secondary: ApplicationSettings.darkColorTheme.secondaryColor,
            accent: ApplicationSettings.darkColorTheme.accentColor,
            background: ApplicationSettings.darkColorTheme.backgroundColor,
            surface: ApplicationSettings.darkColorTheme.surfaceColor,
            grey: ApplicationSettings.darkColorTheme.grayColor,
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

app.mount('#app');
