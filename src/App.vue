<template>
  <v-app :theme="currentTheme.name">
    <!-- General place for all Header-Related staff. -->
    <header>
      <nav>
        <v-app-bar>
          <v-app-bar-nav-icon icon="mdi-calendar-month-outline" />
          <v-app-bar-title class="header-content">Расписание УКСИВТ</v-app-bar-title>
          <v-spacer /> <v-spacer />

          <v-btn :ripple="false">
            <v-hover :disabled="true">
              <v-select chips
                        label="Тема:"
                        :items="themes"
                        @update:model-value="onThemeSelectionChanged"
                        v-model="currentTheme"
                        item-title="title"
                        item-value="title"
                        class="theme-picker"
                        return-object />
            </v-hover>
          </v-btn>
          <v-menu>
            <template>
              <v-btn icon="mdi-wrench" color="purple" />
            </template>
          </v-menu>

          <template v-slot:extension>
            <v-tabs>
              <v-tab to="/">Заглавная</v-tab>
              <v-tab to="/about">Информация</v-tab>
              <v-tab to="/settings">Настройки</v-tab>
            </v-tabs>
          </template>
        </v-app-bar>
        <v-sheet>
          <v-container />
        </v-sheet>
      </nav>
    </header>

    <!-- Main page content. -->
    <main>
      <router-view />
    </main>

    <!-- General place for all Footer-Related staff. -->
    <footer>
      <FooterComponent />
    </footer>
  </v-app>
</template>

<script lang="ts">
  import { CURRENT_THEME_KEY } from '@/common/keys';
  import FooterComponent from '@/components/base/FooterComponent.vue';
  import ApplicationSettings from '@/models/themes/ApplicationThemes';
  import ColorsTheme from '@/models/themes/ColorsTheme';

  export default {
    data() {
      return {
        currentTheme: JSON.parse(localStorage.getItem(CURRENT_THEME_KEY) || '{}') || ApplicationSettings.getDefaultTheme(),
        themes: ApplicationSettings.colorThemes,
      };
    },
    methods: {
      onThemeSelectionChanged(item: ColorsTheme) {
        localStorage.setItem(CURRENT_THEME_KEY, JSON.stringify(item));
      },
    },

    name: 'App',
    components: {
      FooterComponent,
    },
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,400;0,700;1,300&display=swap');
  @import '@/../public/css/general.css';

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }

  main {
    margin-top: 3.141%;
  }
</style>
