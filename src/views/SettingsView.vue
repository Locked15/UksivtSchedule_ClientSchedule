<!-- eslint-disable vue/max-len (Because Prettier have another settings, and this page contains a lot of long texts). -->

<template>
  <div class="settings-parent-container">
    <h1 class="header-content">Настройки</h1>
    <div class="explanation-container">
      <article>
        <p>
          Локальные настройки сайта позволяют установить предпочтения пользователя в определённых элементах работы сайта. В число подобных
          настраиваемых элементов может входить цветовая схема, предпочтения в алгоритмах поиска и прочее.
        </p>
        <p>Все параметры, обозначенные подчёркиванием и выделенные звездочками, являются значениями по умолчанию.</p>
        <p>
          Все устанавливаемые настройки применяются автоматически и записываются в память браузера.
          Настройки сохраняются между отдельными сессиями использования приложения.
        </p>
      </article>

      <hr class="heirloom-hr" />
      <section>
        <h2 class="header-content">Описание Параметров</h2>
        <section class="explanation-parameters-list">
          На данный момент сайт использует 4 параметра, настраиваемых пользователем:

          <div id="usingDataSource" class="explanation-parameter-container">
            <hr class="heirloom-hr settings-split2" />
            <h4 class="header-content">Используемый Источник Данных</h4>
            <section>
              Определяет конечную точку получения данных. На данный момент система поддерживает 2 источника данных:

              <div class="explanation-parameter-container">
                <hr class="heirloom-hr settings-split3" />
                <h5 class="default-option">* Динамические Ассеты *</h5>
                <span>
                  <p>
                    В данном случае API автоматически подтягивает необходимые сведения из документов. Документы скачиваются и обрабатываются прямо во
                    время формирования <i>запроса*</i>, что позволяет получать самые актуальные данные.
                  </p>
                  <p>Однако такой подход требует большего времени для выполнения, что приводит к замедлению получения целевой информации.</p>
                </span>
              </div>
              <div class="explanation-parameter-container">
                <hr class="heirloom-hr settings-split3" />
                <h5>Облачная База Данных</h5>
                <span>
                  <p>
                    Облачная база данных — В этом случае данные о расписании вытягиваются API из облачной базы данных, развёрнутой на сервере.
                    Получения сведений происходит при не сразу, что может привести к получению несколько неактуальных данных.
                  </p>
                  <p>
                    Однако в то же время, БД оптимизирована для работы с данными, они хранятся уже в готовом виде, что серьезно увеличивает скорость
                    выполнения запросов.
                  </p>
                </span>
              </div>
            </section>
          </div>
          <div id="usingApiBranch" class="explanation-parameter-container">
            <hr class="heirloom-hr settings-split2" />
            <h4 class="header-content">Используемая Ветка API</h4>
            <section>
              Определяет используемую для получения данных ветку API. На данный момент доступно 2 ветки API:

              <div class="explanation-parameter-container">
                <hr class="heirloom-hr settings-split3" />
                <h5 class="default-option">* Стабильная *</h5>
                <span>
                  <p>Данная ветка обладает протестированным функционалом и протестирована перед загрузкой на сервер и в целом работает быстрее.</p>
                  <p>
                    Однако новейшие функциональные обновления попадают на стабильный сервер позже и обычно в составе полноценных
                    <strong>релизов</strong>.
                  </p>
                </span>
              </div>
              <div class="explanation-parameter-container">
                <hr class="heirloom-hr settings-split3" />
                <h5>Предварительная (Preview)</h5>
                <span>
                  <p>
                    Полнофункциональный тестовый сервер, развёрнутый на пуле приложений облачной платформы Azure (что налагает определённые
                    ограничения).
                  </p>
                  <p>
                    Работает медленнее, могут возникать определённые сбои в работе. В то же время все новейшие (и не очень) обновления сначала
                    проверяются на нём.
                  </p>
                </span>
              </div>
            </section>
          </div>
          <div id="selectableData" class="explanation-parameter-container">
            <hr class="heirloom-hr settings-split2" />
            <h4 class="header-content">Выбираемые Данные</h4>
            <section>
              <article>
                <span>
                  Если ни один из параметров не будет выбран, будет возвращён пустой результат.
                  Если будет выбрано несколько элементов, они будут представлены последовательно.
                </span>
                <span>
                  При выборе Динамических ассетов в качестве источника данных часть сведений будет недоступна (например, количество прошедших часов).
                </span>
              </article>

              <div class="explanation-parameter-container">
                <hr class="heirloom-hr settings-split3" />
                <h5>Базовое Расписание</h5>
                <span>
                  <p>Содержит сведения о базовом расписании.</p>
                  <p><strong>ВАЖНО: Данный параметр игнорирует источник получаемых данных и вытягивает данные из ассетов</strong>.</p>
                </span>
              </div>
              <div class="explanation-parameter-container">
                <hr class="heirloom-hr settings-split3" />
                <h5>Замены Расписания</h5>
                <span>
                  <p>Содержит сведения о заменах для расписания.</p>
                  <p>Возвращает пустое значение, если замены для указанной даты/группы не обнаружены (вместе с соответствующим уведомлением).</p>
                </span>
              </div>
              <div class="explanation-parameter-container">
                <hr class="heirloom-hr settings-split3" />
                <h5 class="default-option">* Итоговое Расписание *</h5>
                <span>
                  <p>Содержит сведения об итоговом расписании группы.</p>
                  <p>Если замены не найдены, вместе с уведомлением будет возвращено базовое расписание.</p>
                </span>
              </div>
            </section>
          </div>
          <div id="currentTheme" class="explanation-parameter-container">
            <hr class="heirloom-hr settings-split2" />
            <h4 class="header-content">Тема Приложения</h4>
            <section>
              <article>
                <p>Выбранная тема определяет цветовую схему всех элементов приложения.
                </p>
                <p>Выбор темы производится из "шапки" (header) сайта, доступной на любой странице.</p>
              </article>
            </section>
          </div>
        </section>
      </section>

      <hr class="heirloom-hr" />
      <section>
        <h2 class="header-content">Сохранение Данных</h2>
        <span>Подробные сведения представлены на странице <router-link class="styled-link" to="/about">информации</router-link>.</span>
      </section>
    </div>

    <SettingsControl class="control-panel" />
  </div>
</template>

<script lang="ts">
  import SettingsControl from '@/components/widgets/SettingsControl.vue';

  export default {
    components: {
      SettingsControl,
    },
  };
</script>

<style scoped>
  section {
    display: flex;
    flex-direction: column;
  }

  .settings-parent-container {
    display: flex;
    flex-direction: column;

    align-items: center;
  }

  .explanation-container {
    max-width: 60%;
  }

  .explanation-parameters-list {
    gap: 32px;
  }

  .explanation-parameter-container {
    display: flex;
    flex-direction: column;
  }

  .default-option {
    text-decoration: underline;
  }

  .settings-split2 {
    align-self: center;

    height: 15px;
    width: 75%;
  }

  .settings-split2::before {
    border: none;
  }

  .settings-split3 {
    align-self: center;

    height: 5px;
    width: 30%;
  }

  .settings-split3::before {
    border: none;
  }

  .control-panel {
    margin-top: 3.14%;
  }
</style>
