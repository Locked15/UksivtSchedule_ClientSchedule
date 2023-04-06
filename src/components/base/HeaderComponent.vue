<template>
  <nav>
    <v-app-bar>
      <v-app-bar-nav-icon />
      <v-app-bar-title>Расписание УКСИВТ</v-app-bar-title>
      <v-spacer />

      <v-btn>
        <v-icon end icon="mdi-checkbox-marked-circle" />
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
          <v-tab>Tab 3</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-sheet>
      <v-container />
    </v-sheet>
  </nav>
</template>
