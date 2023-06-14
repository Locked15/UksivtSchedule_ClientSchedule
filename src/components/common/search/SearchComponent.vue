<template>
  <div>
    <h2 class="header-content">Поиск</h2>
    <div>
      <v-text-field density="compact"
                    variant="outlined"
                    label="Что ищем?"
                    v-model="viewModel.searchRequest"
                    @update:model-value="onSearchRequestUpdated"
                    persistent-hint
                    clearable />
      <div class="search-parameters">
        <v-checkbox label="Поиск по преподавателям?" @change="onSearchTypeChange" v-model="viewModel.searchByTeachers" />
      </div>

      <v-sheet class="results-container-outer" color="grey">
        <h3 class="header-content">Результаты</h3>
        <div>
          <div class="results-container-inner">
            <v-card v-for="variant in viewModel.availableVariants.slice(0, 6)" v-bind:key="`result-${variant}`">
              <v-card-title>{{ getTitleForItem(variant) }}</v-card-title>
              <v-btn @click="onTargetSelected(variant)">Выбрать</v-btn>
            </v-card>

            <div v-if="viewModel.availableVariants.length < 1">
              <p class="search-is-empty">✖️ ... ✖️</p>
            </div>
          </div>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<script lang="ts">
  import ApplicationData from '@/common/data/ApplicationData';
  import StructureRepository from '@/common/repository/v1/StructureRepository';
  import SearchRepository from '@/common/repository/v2/SearchRepository';
  import { compareTeacherData, compareGroupData } from '@/common/utils/FilterHelper';
  import Teacher from '@/models/api/entities/v2/base/Teacher';
  import { isInstanceOfTeacher } from '@/models/api/entities/v2/common/cast/ModernEntityCastUtils';
  import SearchMessages from '@/models/common/messages/SearchMessages';
  import ToastConfiguration from '@/models/common/messages/base/ToastConfiguration';
  import UserSettings from '@/models/common/user/UserSettings';
  import SearchModel from '@/models/components/common/search/SearchModel';
  import Swal from 'sweetalert2';
  import { Vue } from 'vue-class-component';
  import { useToast } from 'vue-toastification';

  export default class SearchComponent extends Vue {
    /**
     * Contains all available group names.
     */
    public viewModel = SearchModel.getDefaultModel();

    public data = () => this.viewModel;

    public beforeMount() {
      if (ApplicationData.availableGroups.length < 1) {
        new StructureRepository(true).getGroupsList(false).then((data) => {
          if (data != null) {
            ApplicationData.availableGroups = data;
          }
        });
      }
      if (ApplicationData.availableTeachers.length < 1) {
        new SearchRepository(true).getTeachersList(false).then((data) => {
          if (data != null) {
            ApplicationData.availableTeachers = data;
          }
        });
      }
    }

    public getTitleForItem(item: any): string {
      if (isInstanceOfTeacher(item)) {
        return Teacher.clone(item).toString();
      }
      return item;
    }

    public onSearchTypeChange() {
      const settings = UserSettings.getUserSettings() || UserSettings.getDefaultUserSettings();
      if (!settings.useDBAsSource) {
        this.viewModel.searchByTeachers = false;
        Swal.fire(SearchMessages.teachersSearchNotAvailableWithoutDB.title, SearchMessages.teachersSearchNotAvailableWithoutDB.message);
      } else {
        this.viewModel.searchRequest = '';
        this.onSearchRequestUpdated();
      }
    }

    public onSearchRequestUpdated() {
      if (this.viewModel.searchByTeachers) {
        this.searchForTargetTeacher();
      } else {
        this.searchForTargetGroup();
      }
    }

    private searchForTargetTeacher() {
      const request = this.viewModel.searchRequest || '';
      if (request !== '') {
        this.viewModel.availableVariants = ApplicationData.availableTeachers.filter((teacher) => compareTeacherData(teacher, request));
        this.showSpecialMessagesIfCompletesCondition(request);
      } else {
        this.viewModel.availableVariants = Array<Teacher>();
      }
    }

    private searchForTargetGroup() {
      const request = this.viewModel.searchRequest || '';
      if (request !== '') {
        this.viewModel.availableVariants = ApplicationData.availableGroups.filter((group) => compareGroupData(group, request));
        this.showSpecialMessagesIfCompletesCondition(request);
      } else {
        this.viewModel.availableVariants = Array<string>();
      }
    }

    private showSpecialMessagesIfCompletesCondition(request: string) {
      if (!SearchMessages.tryToShowSpecialMessageForGreatGood(request)) {
        if (this.viewModel.availableVariants.length === 0) {
          SearchComponent.showWarningMessageResultSetIsEmpty();
        }
      }
    }

    private static showWarningMessageResultSetIsEmpty() {
      const config: any = ToastConfiguration.nothingIsFoundToastConfiguration;
      useToast().info(SearchMessages.emptySearchResult.message, config);
    }

    public onTargetSelected(target: any) {
      const targetValue = isInstanceOfTeacher(target) ? target.id : target;
      this.$router.push({
        name: 'result',
        query: {
          target: targetValue,
          useTeacherSearch: this.viewModel.searchByTeachers.toString(),
        },
      });
    }
  }
</script>

<style scoped>
  @import "@/../public/css/common/search-component.css";
</style>
