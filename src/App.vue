<template>
  <v-app :theme="currentTheme">
    <!-- General place for all Header-Related staff. -->
    <header>
      <v-select chips label="Текущая тема" :items="themes"
                v-on:update:model-value="onThemeSelectionChanged" v-model="currentTheme" />
      <HeaderComponent />
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

  export default {
    data() {
      return {
        currentTheme: localStorage.getItem('UKSIVT_CurrentTheme') || '',
        themes: ApplicationSettings.colorThemeNames,
      };
    },
    methods: {
      onThemeSelectionChanged(item: string) {
        localStorage.setItem('UKSIVT_CurrentTheme', item);
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
