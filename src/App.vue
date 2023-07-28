<template>
  <v-app :theme="applicationBaseModel.currentTheme.name">
    <!-- General place for all Header-Related staff. -->
    <header>
      <nav>
        <v-app-bar>
          <v-app-bar-nav-icon icon="mdi-calendar-month-outline" @click="onIconClick" />
          <v-app-bar-title class="header-content app-title">Расписание УКСИВТ</v-app-bar-title>
          <v-spacer /> <v-spacer class="app-title" />

          <v-btn>
            <v-select label="Тема:"
                      :items="applicationBaseModel.themes"
                      @update:model-value="onThemeSelectionChanged"
                      v-model="applicationBaseModel.currentTheme"
                      item-title="title"
                      item-value="title"
                      class="theme-picker"
                      return-object
                      z-index="1" />
          </v-btn>

          <template v-slot:extension>
            <v-tabs class="header-nav">
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
  import { Options, Vue } from 'vue-class-component';
  import { CURRENT_THEME_KEY } from '@/common/keys';

  import FooterComponent from '@/components/base/FooterComponent.vue';
  import ApplicationThemes from '@/models/common/themes/ApplicationThemes';
  import ColorsTheme from '@/models/common/themes/ColorsTheme';
  import ApplicationBaseModel from '@/models/views/ApplicationBaseModel';

  @Options({
    props: {
      name: 'app',
    },
    components: {
      FooterComponent,
    },
  })

  export default class App extends Vue {
    public applicationBaseModel = this.initModel();

    public data() {
      return {
        viewModel: this.applicationBaseModel,
      };
    }

    // eslint-disable-next-line class-methods-use-this
    private initModel() : ApplicationBaseModel {
      const themes = ApplicationThemes.colorThemes;
      const savedSelectedTheme = localStorage.getItem(CURRENT_THEME_KEY);
      const currentTheme = savedSelectedTheme === null ? ApplicationThemes.getDefaultTheme()
                                                       : JSON.parse(savedSelectedTheme);

      return new ApplicationBaseModel(currentTheme, themes);
    }

    // eslint-disable-next-line class-methods-use-this
    onThemeSelectionChanged(item: ColorsTheme) {
      localStorage.setItem(CURRENT_THEME_KEY, JSON.stringify(item));
    }

    onIconClick() {
      this.$router.push('/');
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,400;0,700;1,300&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;1,200&display=swap');

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
    margin-top: 64px;
  }

  @media (max-width: 671px) {
    .app-title {
      display: none;
    }

    .theme-picker > .v-input__control {
      height: 0 !important;
    }
  }
</style>
