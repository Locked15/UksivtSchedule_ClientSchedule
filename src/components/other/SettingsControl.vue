<template>
  <div class="settings-control-parent">
    <h3 class="header-content">Панель Управления</h3>
    <v-sheet rounded="xl" class="settings-control-panel">
      <v-checkbox v-model="settingsControlModel.currentUserSettings.useDBAsSource" label="Использовать БД?" @change="onParametersChanged" />
      <v-checkbox v-model="settingsControlModel.currentUserSettings.useStableAPIBranch"
                  label="Использовать стабильную ветку API?"
                  @change="onParametersChanged" />

      <v-select chips
                label="Выбираемые данные:"
                v-model="settingsControlModel.currentUserSettings.informationToSelect"
                item-title="type"
                item-value="type"
                :items="settingsControlModel.ALL_SELECTABLE_VARIANTS"
                @update:model-value="onParametersChanged"
                return-object
                multiple />
    </v-sheet>
  </div>
</template>

<script lang="ts">
  import { USER_SETTINGS_KEY } from '@/common/keys';
  import UserMessages from '@/models/messages/UserMessages';
  import SettingsModel from '@/models/views/SettingsModel';
  import Swal from 'sweetalert2';
  import { Vue } from 'vue-class-component';

  export default class SettingsControl extends Vue {
    public settingsControlModel = new SettingsModel();

    public beforeMount(): void {
      if (this.settingsControlModel.userSettingsAreInitializedAgain) {
        this.saveCurrentUserSettings();
        Swal.fire(UserMessages.UserNotFound.title, UserMessages.UserNotFound.message, 'error');
      }
    }

    // eslint-disable-next-line class-methods-use-this
    public onParametersChanged() {
      this.saveCurrentUserSettings();
    }

    private saveCurrentUserSettings() {
      localStorage.setItem(
        USER_SETTINGS_KEY,
        JSON.stringify(this.settingsControlModel.currentUserSettings),
      );
    }
  }
</script>

<style scoped>
  .settings-control-parent {
      display: flex;
      flex: auto;
      flex-direction: column;

      margin-top: 24px;
    }

  .settings-control-panel {
      display: flex;
      flex-direction: column;

      align-self: center;
      gap: 2.5%;

      width: max-content;
      padding: 2.16rem;

      border: solid 2.74px;
    }
</style>
