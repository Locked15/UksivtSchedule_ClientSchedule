<!-- eslint-disable vue/max-len -->

<template>
  <div>
    <h2 class="header-content">Поиск</h2>
    <div>
      <v-text-field density="compact"
                    persistent-hint
                    variant="outlined"
                    label="Что ищем?"
                    v-model="viewModel.searchRequest"
                    @update:model-value="onSearchRequestUpdated"
                    clearable />
      <div class="search-parameters">
        <v-checkbox label="Поиск по преподавателям?" @change="onSearchParametersChanged" v-model="viewModel.searchByTeachers" />
      </div>

      <v-sheet class="results-container-outer" color="grey">
        <h3 class="header-content">Результаты</h3>
        <div>
          <div class="results-container-inner">
            <v-card v-for="group in viewModel.selectedGroups.slice(0, 6)" v-bind:key="`result-${group}`">
              <v-card-title>{{ group }}</v-card-title>
              <v-btn @click="onGroupSelected(group)">Выбрать</v-btn>
            </v-card>

            <div v-if="viewModel.selectedGroups.length < 1">
              <p class="search-is-empty">✖️ ... ✖️</p>
            </div>
          </div>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<script lang="ts">
  import { LATEST_SEARCH_TARGET } from '@/common/keys';
  import ApplicationData from '@/common/data/ApplicationData';
  import StructureRepository from '@/common/repository/v1/StructureRepository';
  import SearchMessages from '@/models/common/messages/SearchMessages';
  import SearchModel from '@/models/views/SearchModel';
  import Swal from 'sweetalert2';
  import { Vue } from 'vue-class-component';

  export default class SearchComponent extends Vue {
    /**
     * Contains all available group names.
     */
    public viewModel = SearchModel.getDefaultModel();

    // eslint-disable-next-line class-methods-use-this
    public data(): SearchModel {
      return this.viewModel;
    }

    // eslint-disable-next-line class-methods-use-this
    public beforeMount() {
      if (ApplicationData.length < 1) {
        StructureRepository.getGroupsList(true, false)
          .then((data) => {
            if (data != null) {
              ApplicationData.availableGroups = data;
            }
          });
      }
    }

    public onSearchParametersChanged() {
      if (this.viewModel.searchByTeachers) {
        // eslint-disable-next-line vue/max-len
        Swal.fire(SearchMessages.teachersSearchNotYetImplemented.title, SearchMessages.teachersSearchNotYetImplemented.message, 'warning');
        this.viewModel.searchByTeachers = false;
      }
    }

    public async onSearchRequestUpdated() {
      const loweredRequest = this.viewModel.searchRequest?.toLowerCase() || '';
      if (loweredRequest !== '') {
        const selected = await ApplicationData.availableGroups
                                   .filter((group) => group.toLowerCase().includes(loweredRequest));
        this.viewModel.selectedGroups = selected;

        if (!SearchMessages.tryToShowSpecialMessageForGreatGood(loweredRequest)) {
          this.showWarningMessageIfResultSetIsEmpty();
        }
      } else {
        this.viewModel.selectedGroups = Array<string>();
      }
    }

    private showWarningMessageIfResultSetIsEmpty() {
      if (this.viewModel.selectedGroups.length === 0) {
        Swal.fire(SearchMessages.emptySearchResult.title, SearchMessages.emptySearchResult.message, 'warning');
      }
    }

    public onGroupSelected(group: string) {
      localStorage.setItem(LATEST_SEARCH_TARGET, group);
      this.$router.push('/result');
    }
  }
</script>

<style scoped>
  .search-parameters {
    display: flex;
    flex: auto;
    flex-direction: row wrap;
  }

  .results-container-outer {
    border-radius: 16px;
  }

  .results-container-inner {
    display: flex;

    flex-flow: row wrap;
    justify-content: space-around;

    gap: 14px;
    row-gap: 14px;

    padding: 16px;
  }

  .search-is-empty {
    font-family: 'IBM Plex Mono', monospace;
    font-size: large;
  }
</style>
