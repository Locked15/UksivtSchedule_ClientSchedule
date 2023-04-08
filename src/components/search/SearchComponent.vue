<!-- eslint-disable vue/max-len -->

<template>
  <div>
    <h2 class="header-content">Поиск</h2>
    <div>
      <v-text-field density="compact" persistent-hint variant="outlined"
                    label="Что ищем?" v-model="viewModel.searchRequest"
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
              <v-card-subtitle>Всего доступно: {{ viewModel.selectedGroups.length }}.</v-card-subtitle>
            </v-card>

            <div v-if="viewModel.selectedGroups.length < 1">
              <p class="search-is-empty">
                ✖️ ... ✖️
              </p>
            </div>
          </div>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<script lang="ts">
  import StructureRepository from '@/common/repository/StructureRepository';
  import SearchModel from '@/models/views/SearchModel';
  import SearchMessages from '@/models/messages/SearchMessages';
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
    public async beforeMount() {
      const data = await new StructureRepository(true).getGroupsList();
      if (data) {
        this.viewModel.availableGroups = data;
      }
    }

    public onSearchParametersChanged() {
      if (this.viewModel.searchByTeachers) {
        Swal.fire();
        this.viewModel.searchByTeachers = false;
      }
    }

    public async onSearchRequestUpdated() {
      const loweredRequest = this.viewModel.searchRequest?.toLowerCase() || '';
      if (loweredRequest !== '') {
        const selected = await this.viewModel.availableGroups
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
