<!-- eslint-disable vue/max-len -->
<template>
  <div>
    <h1>Выборка Результата</h1>
    <div class="result-selection-parent">
      <span class="result-selection-row">
        <v-select label="Какие дни нужно отобразить?"
                  :items="viewModel.ALL_AVAILABLE_DAYS"
                  v-model="viewModel.selectedDays"
                  item-title="name"
                  item-value="name"
                  @update:model-value="onShowingDaysSelectionChanged"
                  chips return-object multiple />
      </span>
    </div>

    <div class="result-navigation-parent">
      <span class="result-navigation-header">
        <hr class="heirloom-hr result-presence-divider" />
        <h2 class="header-content" title="На основе настроек Вам доступны следующие результаты.">Выбор Результата</h2>
      </span>

      <span class="result-selection-panel">
        <!-- Template for basic schedule. -->
        <div v-if="checkBasicScheduleSelectionIsEnabled()">
          <v-dialog v-model="dialogsActivityState.isBasicScheduleDialogActive" scrim="false"
                    transition="dialog-bottom-transition" fullscreen persistent>
            <template v-slot:activator="{ props }">
              <v-btn color="primary" v-bind="props">Базовое Расписание</v-btn>
            </template>

            <v-card>
              <v-toolbar color="grey">
                <v-btn icon="mdi-close" @click="dialogsActivityState.isBasicScheduleDialogActive = false" />

                <v-toolbar-title>Базовое Расписание</v-toolbar-title>
                <v-spacer />
                <v-toolbar-items>
                  <v-btn icon="mdi-account-question-outline" @click="getInfoAboutResult()" />
                </v-toolbar-items>
              </v-toolbar>
              <ResultComponent :componentModel="createModelForResultComponent(bind_SelectableInformation.basicSchedule)" />
            </v-card>
          </v-dialog>
        </div>

        <!-- Template for schedule replacements. -->
        <div v-if="checkScheduleReplacementsSelectionIsEnabled()">
          <v-dialog v-model="dialogsActivityState.isScheduleReplacementsDialogActive" scrim="false"
                    transition="dialog-bottom-transition" fullscreen persistent>
            <template v-slot:activator="{ props }">
              <v-btn color="primary" v-bind="props">Замены Расписания</v-btn>
            </template>

            <v-card>
              <v-toolbar color="grey">
                <v-btn icon="mdi-close" @click="dialogsActivityState.isScheduleReplacementsDialogActive = false" />

                <v-toolbar-title>Замены Расписания</v-toolbar-title>
                <v-spacer />
                <v-toolbar-items>
                  <v-btn icon="mdi-account-question-outline" @click="getInfoAboutResult()" />
                </v-toolbar-items>
              </v-toolbar>
              <ResultComponent :componentModel="createModelForResultComponent(bind_SelectableInformation.scheduleReplacements)" />
            </v-card>
          </v-dialog>
        </div>

        <!-- Template for final schedule. -->
        <div v-if="checkFinalScheduleSelectionIsEnabled()">
          <v-dialog v-model="dialogsActivityState.isFinalScheduleDialogActive" scrim="false"
                    transition="dialog-bottom-transition" fullscreen persistent>
            <template v-slot:activator="{ props }">
              <v-btn color="primary" v-bind="props">Итоговое Расписание</v-btn>
            </template>

            <v-card>
              <v-toolbar color="grey">
                <v-btn icon="mdi-close" @click="dialogsActivityState.isFinalScheduleDialogActive = false" />

                <v-toolbar-title>Итоговое Расписание</v-toolbar-title>
                <v-spacer />
                <v-toolbar-items>
                  <v-btn icon="mdi-account-question-outline" @click="getInfoAboutResult()" />
                </v-toolbar-items>
              </v-toolbar>
              <ResultComponent :componentModel="createModelForResultComponent(bind_SelectableInformation.finalSchedule)" />
            </v-card>
          </v-dialog>
        </div>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import { LATEST_SEARCH_TARGET } from '@/common/keys';
  import { Options, Vue } from 'vue-class-component';
  import ResultMessage from '@/models/messages/ResultMessages';
  import ResultSelectionModel from '@/models/views/ResultSelectionModel';
  import Swal from 'sweetalert2';
  import SelectableInformation from '@/models/user/SelectableInformation';
  import ResultComponent from '@/components/result/ResultComponent.vue';
  import ResultComponentModel from '@/models/views/ResultComponentModel';

  @Options({
    components: {
      ResultComponent,
    },
  })

  export default class ResultView extends Vue {
    public viewModel = ResultSelectionModel.getDefaultModel();

    public dialogsActivityState = {
      isBasicScheduleDialogActive: false,
      isScheduleReplacementsDialogActive: false,
      isFinalScheduleDialogActive: false,
    };

    public bind_SelectableInformation = {
      basicSchedule: SelectableInformation.BASIC_SCHEDULE,
      scheduleReplacements: SelectableInformation.SCHEDULE_REPLACEMENTS,
      finalSchedule: SelectableInformation.FINAL_SCHEDULE,
    };

    public async beforeMount() {
      let target = localStorage.getItem(LATEST_SEARCH_TARGET);
      if (!target || target == null || target === '') {
        Swal.fire();
        target = ResultSelectionModel.DEFAULT_GROUP_NAME;
      }

      this.viewModel.groupName = target;
    }

    public onShowingDaysSelectionChanged() {
      if (this.viewModel.selectedDays.length < 1) {
        Swal.fire(ResultMessage.ShowSelectionIsEmpty.title, ResultMessage.ShowSelectionIsEmpty.message, 'warning');
      } else if (this.viewModel.selectedDays.length > 3) {
        Swal.fire(ResultMessage.ShowSelectionIsLarge.title, ResultMessage.ShowSelectionIsLarge.message, 'warning');
      }
    }

    /**
     * ToDo: Remade this, to remove these 4 functions to standalone file.
     */
    public checkBasicScheduleSelectionIsEnabled(): boolean {
      const targetId = SelectableInformation.BASIC_SCHEDULE.id;
      const selectable = this.viewModel.currentUserSettings.informationToSelect;

      return ResultView.checkToPresence(targetId, selectable);
    }

    public checkScheduleReplacementsSelectionIsEnabled(): boolean {
      const targetId = SelectableInformation.SCHEDULE_REPLACEMENTS.id;
      const selectable = this.viewModel.currentUserSettings.informationToSelect;

      return ResultView.checkToPresence(targetId, selectable);
    }

    public checkFinalScheduleSelectionIsEnabled(): boolean {
      const targetId = SelectableInformation.FINAL_SCHEDULE.id;
      const selectable = this.viewModel.currentUserSettings.informationToSelect;

      return ResultView.checkToPresence(targetId, selectable);
    }

    private static checkToPresence(targetId: number, selectable: SelectableInformation[]): boolean {
      const foundElement = selectable.find((element) => element.id === targetId);

      // Firstly, we check value to be empty (!val), and then we revert this, to check presence.
      return !!foundElement;
    }

    public getInfoAboutResult() {
      Swal.fire(this.viewModel.groupName, 'В данном окне представлена выбранная Вами информация.', 'info');
    }

    public createModelForResultComponent(selectable: SelectableInformation) : ResultComponentModel {
      return new ResultComponentModel(
        this.viewModel.currentUserSettings,
        this.viewModel.groupName,
        selectable,
        this.viewModel.selectedDays,
      );
    }
  }
</script>

<style scoped>
  .result-selection-parent {
    display: flex;
    flex-direction: column;
  }

  .result-selection-parent > .result-selection-row {
    align-self: center;

    width: 50%;
    max-width: 60%;
    overflow: scroll;
  }

  .result-navigation-parent {
    display: flex;
    flex-direction: column;
  }

  .result-navigation-parent > .result-navigation-header {
    display: flex;
    flex-direction: column;

    width: 42%;
    align-self: center;
  }

  .result-navigation-parent > .result-selection-panel {
    display: flex;
    flex: auto;
    flex-direction: column;

    gap: 16px;
  }

  .result-navigation-header > h2 {
    cursor: help;
  }

  .result-presence-divider {
    height: 15px;
  }

  .result-presence-divider::after {
    height: 15px;
  }
</style>
