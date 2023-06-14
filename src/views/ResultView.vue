<template>
  <div>
    <h1>Выборка Результата</h1>
    <div>
      <ResultDateSelector :selectorModel="selectableDatesModel" :useDBAsSource="viewModel.currentUserSettings.useDBAsSource" />
      <div class="result-navigation-parent">
        <span class="result-navigation-header">
          <hr class="heirloom-hr result-presence-divider" />
          <h2 class="header-content" title="На основе настроек Вам доступны следующие результаты.">Выбор Результата</h2>
        </span>

        <span class="result-selection-panel">
          <!-- Template for Basic Schedule. -->
          <div v-if="checkBasicScheduleSelectionIsEnabled()">
            <v-dialog v-model="bindData.dialogsActivityState.isBasicScheduleDialogActive" scrim="false" transition="dialog-bottom-transition"
                      fullscreen persistent>
              <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props" :disabled="!selectableDatesModel.getAvailabilityState()">Базовое Расписание</v-btn>
              </template>

              <v-card>
                <v-toolbar color="grey">
                  <v-btn icon="mdi-close" @click="bindData.dialogsActivityState.isBasicScheduleDialogActive = false" />

                  <v-toolbar-title>Базовое Расписание</v-toolbar-title>
                  <v-spacer />
                  <v-toolbar-items>
                    <v-btn icon="mdi-account-question-outline" @click="getInfoAboutResult()" />
                  </v-toolbar-items>
                </v-toolbar>
                <ResultDialogComponent :componentModel="createModelForResultComponent(bindData.selectableInformation.basicSchedule)" />
              </v-card>
            </v-dialog>
          </div>

          <!-- Template for Schedule Replacements. -->
          <div v-if="checkScheduleReplacementsSelectionIsEnabled()">
            <v-dialog v-model="bindData.dialogsActivityState.isScheduleReplacementsDialogActive" scrim="false" transition="dialog-bottom-transition"
                      fullscreen persistent>
              <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props" :disabled="!selectableDatesModel.getAvailabilityState()">Замены Расписания</v-btn>
              </template>

              <v-card>
                <v-toolbar color="grey">
                  <v-btn icon="mdi-close" @click="bindData.dialogsActivityState.isScheduleReplacementsDialogActive = false" />

                  <v-toolbar-title>Замены Расписания</v-toolbar-title>
                  <v-spacer />
                  <v-toolbar-items>
                    <v-btn icon="mdi-account-question-outline" @click="getInfoAboutResult()" />
                  </v-toolbar-items>
                </v-toolbar>
                <ResultDialogComponent :componentModel="createModelForResultComponent(bindData.selectableInformation.scheduleReplacements)" />
              </v-card>
            </v-dialog>
          </div>

          <!-- Template for Final Schedule. -->
          <div v-if="checkFinalScheduleSelectionIsEnabled()">
            <v-dialog v-model="bindData.dialogsActivityState.isFinalScheduleDialogActive" scrim="false" transition="dialog-bottom-transition"
                      fullscreen persistent>
              <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props" :disabled="!selectableDatesModel.getAvailabilityState()">Итоговое Расписание</v-btn>
              </template>

              <v-card>
                <v-toolbar color="grey">
                  <v-btn icon="mdi-close" @click="bindData.dialogsActivityState.isFinalScheduleDialogActive = false" />

                  <v-toolbar-title>Итоговое Расписание</v-toolbar-title>
                  <v-spacer />
                  <v-toolbar-items>
                    <v-btn icon="mdi-account-question-outline" @click="getInfoAboutResult()" />
                  </v-toolbar-items>
                </v-toolbar>
                <ResultDialogComponent :componentModel="createModelForResultComponent(bindData.selectableInformation.finalSchedule)" />
              </v-card>
            </v-dialog>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import ResultDialogComponent from '@/components/common/result/ResultDialogComponent.vue';
  import ResultDialogComponentModel from '@/models/components/common/result/ResultDialogComponentModel';
  import ResultDateSelector from '@/components/widgets/ResultDateSelector.vue';
  import SelectableInformation from '@/models/common/user/SelectableInformation';
  import ResultViewSelectionModel from '@/models/views/ResultViewSelectionModel';
  import Swal from 'sweetalert2';
  import { Options, Vue } from 'vue-class-component';
  import ResultDateSelectorModel from '@/models/components/widgets/ResultDateSelectorModel';
  import ApplicationData from '@/common/data/ApplicationData';
  import Teacher from '@/models/api/entities/v2/base/Teacher';

  @Options({
    components: {
      ResultDateSelector,
      ResultDialogComponent,
    },
  })

  export default class ResultView extends Vue {
    public viewModel = ResultViewSelectionModel.getDefaultModel();

    public selectableDatesModel = ResultDateSelectorModel.getDefaultModel();

    public bindData = {
      dialogsActivityState: {
        isBasicScheduleDialogActive: false,
        isScheduleReplacementsDialogActive: false,
        isFinalScheduleDialogActive: false,
      },
      selectableInformation: {
        basicSchedule: SelectableInformation.BASIC_SCHEDULE,
        scheduleReplacements: SelectableInformation.SCHEDULE_REPLACEMENTS,
        finalSchedule: SelectableInformation.FINAL_SCHEDULE,
      },
    };

    public async beforeMount() {
      const target = this.$route.query.target?.toString() || ResultViewSelectionModel.DEFAULT_GROUP_NAME;
      const searchByTeachers = this.$route.query.useTeacherSearch?.toString().toLowerCase() === 'true';

      this.viewModel.target = target;
      this.viewModel.searchByTeachers = searchByTeachers;
    }

    public getInfoAboutResult = () => Swal.fire('Сведения', `Данные для: ${this.getTargetObjectTitle()}.`, 'info');

    private getTargetObjectTitle(): string {
      let result = this.viewModel.target;
      if (this.viewModel.searchByTeachers) {
        const foundTeacher = ApplicationData.availableTeachers.find((teacher) => teacher.id === Number(this.viewModel.target));
        result = foundTeacher ? Teacher.clone(foundTeacher).toString() : '[N/A]';
      }

      return result;
    }

    public checkBasicScheduleSelectionIsEnabled = () => ResultView.checkToPresence(SelectableInformation.BASIC_SCHEDULE.id, this.viewModel.currentUserSettings.informationToSelect);

    public checkScheduleReplacementsSelectionIsEnabled = () => ResultView.checkToPresence(SelectableInformation.SCHEDULE_REPLACEMENTS.id, this.viewModel.currentUserSettings.informationToSelect);

    public checkFinalScheduleSelectionIsEnabled = () => ResultView.checkToPresence(SelectableInformation.FINAL_SCHEDULE.id, this.viewModel.currentUserSettings.informationToSelect);

    private static checkToPresence = (targetId: number, selectable: SelectableInformation[]) => !!selectable.find((element) => element.id === targetId);

    public createModelForResultComponent(selectable: SelectableInformation): ResultDialogComponentModel {
      const model = new ResultDialogComponentModel(
        this.viewModel.target,
        this.viewModel.searchByTeachers,
        selectable,
        this.selectableDatesModel,
        this.viewModel.currentUserSettings,
      );
      return model;
    }
  }
</script>

<style scoped>
  @import "@/../public/css/result/parent-view.css";
</style>
