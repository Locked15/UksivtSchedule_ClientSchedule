<template>
  <div>
    <div class="result-selection-parent">
      <div class="result-selection-row">
        <span class="date-selection-panel" v-if="selectorModel.forTargetDatesSelectionMode">
          <VueDatePicker multi-dates utc :flow="datePickerCalendarsFlow"
                         locale="ru" cancelText="Отмена" selectText="Выбрать"
                         :format="datePickerDateFormat" :preview-format="datePickerDateFormat"
                         v-model="selectorModel.selectedTargetDates"
                         @update:model-value="onTargetItemsSelectionChanged()"
                         :teleport="true"
                         :dark="getCurrentThemeDarkState()"
                         :clearable="false"
                         placeholder="Укажите целевые даты"
                         :class="selectorModel.selectedTargetDates.length > 0 ? 'date-selector-active' : ''" />

          <v-btn v-if="selectorModel.selectedTargetDates.length > 0" @click="onClearTargetDatesSelectionClick()">
            Очистить
          </v-btn>
        </span>
        <span class="day-index-selection-parent" v-else>
          <v-select label="Какие дни нужно отобразить?"
                    :items="selectorModel.ALL_AVAILABLE_DAYS"
                    v-model="selectorModel.selectedDays"
                    @update:model-value="onTargetItemsSelectionChanged"
                    item-title="name"
                    item-value="name"
                    return-object
                    multiple
                    chips />
        </span>
      </div>
      <div class="result-type-selection">
        <div class="type-switcher-parent">
          <v-switch v-model="selectorModel.forTargetDatesSelectionMode"
                    @update:model-value="onSelectionModeChanges()"
                    :label="'Выбор по дате'" inset />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import VueDatePicker from '@vuepic/vue-datepicker';
  import ResultMessages from '@/models/common/messages/ResultMessages';
  import ResultDateSelectorModel from '@/models/components/widgets/ResultDateSelectorModel';
  import Swal from 'sweetalert2';
  import { Vue, Options } from 'vue-class-component';
  import DateWorker from '@/common/utils/DateWorker';
  import ApplicationThemes from '@/models/common/themes/ApplicationThemes';

  @Options({
    components: {
      VueDatePicker,
    },
    props: {
      useDBAsSource: Boolean,
      selectorModel: ResultDateSelectorModel,
    },
  })

  export default class ResultDateSelector extends Vue {
    public useDBAsSource!: boolean;

    public selectorModel!: ResultDateSelectorModel;

    public datePickerCalendarsFlow = ['year', 'month', 'calendar'];

    public data = () => this.selectorModel;

    public getCurrentThemeDarkState(): boolean {
      const currentThemeName = this.$vuetify.theme.name;
      const isDarkTheme = ApplicationThemes.colorThemes.find((theme) => theme.name === currentThemeName)?.isDarkTheme;

      return isDarkTheme || false;
    }

    // eslint-disable-next-line class-methods-use-this
    public datePickerDateFormat(dates: Array<Date>): string {
      if (dates != null) {
        const formattedStrings = new Array<string>();
        dates.forEach((date) => {
          formattedStrings.push(DateWorker.getDateTitleString(date));
        });

        return formattedStrings.join(', ');
      }
      return '';
    }

    public onSelectionModeChanges() {
      if (!this.useDBAsSource && this.selectorModel.forTargetDatesSelectionMode) {
        Swal.fire(
          ResultMessages.SelectionByDateIsUnavailableOnNonDBSettings.title,
          ResultMessages.SelectionByDateIsUnavailableOnNonDBSettings.message,
          'warning',
        );
        this.selectorModel.forTargetDatesSelectionMode = false;
      }
    }

    public onTargetItemsSelectionChanged() {
      const selectedDaysCount = this.selectorModel.selectedDays.length;
      const selectedDatesCount = this.selectorModel.selectedTargetDates.length;

      if (selectedDaysCount < 1 || (selectedDatesCount < 1 && this.selectorModel.forTargetDatesSelectionMode)) {
        Swal.fire(ResultMessages.ShowSelectionIsEmpty.title, ResultMessages.ShowSelectionIsEmpty.message, 'warning');
      } else if (selectedDaysCount > 3 || (selectedDatesCount > 3 && this.selectorModel.forTargetDatesSelectionMode)) {
        Swal.fire(ResultMessages.ShowSelectionIsLarge.title, ResultMessages.ShowSelectionIsLarge.message, 'warning');
      }
    }

    public onClearTargetDatesSelectionClick() {
      this.selectorModel.selectedTargetDates = new Array<Date>();
      this.onTargetItemsSelectionChanged();
    }
  }
</script>

<style scoped>
  @import "@/../public/css/widgets/result-date-selector.css";
</style>
