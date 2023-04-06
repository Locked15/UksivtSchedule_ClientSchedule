<template>
  <v-app :theme="currentTheme.name">
    <!-- General place for all Header-Related staff. -->
    <header>
      <HeaderComponent />
      <v-select chips label="Текущая тема" :items="themes"
                v-on:update:model-value="onThemeSelectionChanged" v-model="currentTheme"
                item-title="title" item-value="title" return-object />
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
  import HeaderComponent from '@/components/base/HeaderComponent.vue';
  import ApplicationSettings from './common/ApplicationSettings';
  import ColorsTheme from './models/ColorsTheme';

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
      HeaderComponent,
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

  .header-nav {
    max-width: 30%;
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
</style>
