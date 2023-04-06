<template>
  <v-app :theme="currentTheme.name">
    <!-- General place for all Header-Related staff. -->
    <header>
      <nav>
        <v-app-bar>
          <v-app-bar-nav-icon />
          <v-app-bar-title>Расписание УКСИВТ</v-app-bar-title>
          <v-spacer />

          <v-btn>
            <v-select chips
                      label="Тема:"
                      :items="themes"
                      v-on:update:model-value="onThemeSelectionChanged"
                      v-model="currentTheme"
                      item-title="title"
                      item-value="title"
                      return-object
                      class="theme-picker" />
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
              <v-tab>Прочее</v-tab>
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
  import FooterComponent from '@/components/base/FooterComponent.vue';

  import ApplicationSettings from './models/themes/ApplicationThemes';
  import ColorsTheme from './models/themes/ColorsTheme';

  export default {
    data() {
      return {
        currentTheme: JSON.parse(localStorage.getItem('UKSIVT_CurrentTheme') || '{}') || ApplicationSettings.getDefaultTheme(),
        themes: ApplicationSettings.colorThemes,
      };
    },
    methods: {
      onThemeSelectionChanged(item: ColorsTheme) {
        localStorage.setItem('UKSIVT_CurrentTheme', JSON.stringify(item));
      },
    },

    name: 'App',
    components: {
      FooterComponent,
    },
  };
</script>

<style>
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

  .theme-picker {
    max-width: 95%;
    box-sizing: border-box;
  }

  main {
    margin-top: 5%;
  }
</style>
