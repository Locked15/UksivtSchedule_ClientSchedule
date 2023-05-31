<template>
  <div class="settings-control-parent">
    <h3 class="header-content">Панель Управления</h3>
    <v-sheet rounded="xl" class="settings-control-panel">
      <v-checkbox v-model="settingsControlModel.currentUserSettings.useDBAsSource"
                  label="Использовать БД?"
                  @change="onParametersChanged"
                  class="settings-selector" />
      <v-checkbox v-model="settingsControlModel.currentUserSettings.useStableAPIBranch"
                  label="Использовать стабильную ветку API?"
                  @change="onParametersChanged"
                  class="settings-selector" />

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
  import UserMessages from '@/models/common/messages/UserMessages';
  import ToastConfiguration from '@/models/common/messages/base/ToastConfiguration';
  import SettingsModel from '@/models/components/widgets/SettingsModel';
  import { Vue } from 'vue-class-component';
  import { useToast } from 'vue-toastification';

  export default class SettingsControl extends Vue {
    public settingsControlModel = new SettingsModel();

    public beforeMount(): void {
      if (this.settingsControlModel.userSettingsAreInitializedAgain) {
        this.saveCurrentUserSettings();
        const config: any = ToastConfiguration.userSettingsNotFoundToastConfiguration;

        useToast().warning(UserMessages.UserNotFound, config);
      }
    }

    public onParametersChanged() {
      this.saveCurrentUserSettings();
    }

    private saveCurrentUserSettings() {
      localStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(this.settingsControlModel.currentUserSettings));
    }
  }
</script>

<style scoped>
  @import '@/../public/css/settings/component.css';
</style>
