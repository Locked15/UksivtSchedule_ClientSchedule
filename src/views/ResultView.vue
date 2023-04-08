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
                  return-object multiple chips />
      </span>
    </div>

    <div class="result-navigation-parent">
      <span class="result-navigation-header">
        <hr class="heirloom-hr result-presence-divider" />
        <h2 class="header-content" title="На основе настроек Вам доступны следующие результаты.">Выбор Результата</h2>
      </span>

      <span>
        <!-- Template for basic schedule. -->
        <div v-if="checkBasicScheduleSelectionIsEnabled()">
          <p>Basic schedule is enabled.</p>
        </div>

        <!-- Template for schedule replacements. -->
        <div v-if="checkScheduleReplacementsSelectionIsEnabled()">
          <p>Replacements is enabled.</p>
        </div>

        <!-- Template for final schedule. -->
        <div v-if="checkFinalScheduleSelectionIsEnabled()">
          <p>Finals are enabled.</p>
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

  @Options({
    components: {},
  })

  export default class ResultView extends Vue {
    viewModel = ResultSelectionModel.getDefaultModel();

    public async beforeMount() {
      let target = localStorage.getItem(LATEST_SEARCH_TARGET);
      if (!target || target == null || target === '') {
        Swal.fire();
        target = ResultSelectionModel.defaultGroupName;
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
