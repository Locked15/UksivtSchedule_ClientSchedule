<template>
  <div class="home">
    <h1 class="header-content">Описание</h1>
    <div>
      <!-- I decided to move explanation to standalone dialog window. -->
      <div class="short-explanation">
        <v-dialog width="auto" v-model="isDialogActive" transition="dialog-bottom-transition">
          <template v-slot:activator="{ props }">
            <article class="advisory-parent">
              <p class="advisory-opener" title="Хотите знать больше? Нажмите на надпись." v-bind="props">
                Это динамический поиск, основанный на данных API.
              </p>
            </article>
          </template>
          <v-card>
            <v-card-text>
              <article>
                <p>
                  Алгоритм поиска автоматически получает данные обо всех группах колледжа.
                  Обычно получение данных происходит на фоне, даже до загрузки сайта.
                </p>
                <p>
                  При вводе какого-либо значения в строку поиска,
                  программа автоматически будет искать возможные совпадения.
                  На основе полученных данных генерируется список групп.
                </p>
                <p>
                  Чтобы продолжить работу необходимо ввести название группы, после чего выбрать её.
                  Это автоматически переведёт Вас на следующий этап.
                </p>
              </article>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" block @click="isDialogActive = false">Закрыть</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <!-- Hack. For the further development (when it's ready). -->
      <div style="display: none;">
        <hr class="heirloom-hr" />
        <div class="favorites-list">
          <FavoriteRequests />
        </div>
      </div>
    </div>

    <div id="searchParent">
      <SearchComponent />
    </div>
  </div>
</template>

<script lang="ts">
  import FavoriteRequests from '@/components/common/search/FavoriteRequests.vue';
  import { Options, Vue } from 'vue-class-component';

  @Options({
    components: {
      FavoriteRequests,
    },
  })

  export default class HomeView extends Vue {
    public isDialogActive = false;
  }
</script>

<style scoped>
  .home {
    font-size: 1.5em;

    display: flex;
    flex: auto;
    flex-direction: column;
  }

  .home > div {
    display: flex;
    flex-direction: column;

    align-self: center;
    width: 75%;
    max-width: 80%;
  }

  .advisory-parent {
    display: flex;
    flex-direction: column;
  }

  .advisory-parent > .advisory-opener {
    align-self: center;
    width: fit-content;

    cursor: help;

    font-family: 'Jost', sans-serif;
    font-weight: 100;
    font-style: italic;

    text-decoration: underline;
  }

  .advisory-opener:hover {
    transition: all 1.5s ease-in-out;
    color: rgb(0, 127, 127);
  }

  .favorites-list {
    display: flex;
    flex: auto;
    flex-direction: column;
  }

  #searchParent {
    margin-top: 3.14rem;
  }
</style>
