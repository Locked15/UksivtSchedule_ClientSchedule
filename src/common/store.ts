import { createStore } from 'vuex';

export default createStore({
  state: {
    selectedScheduleTargetItem: '',
  },
  getters: {
    getSelectedTargetItem(state) {
      return state.selectedScheduleTargetItem;
    },
  },
  mutations: {
    setSelectedTargetItem(state, value: string) {
      state.selectedScheduleTargetItem = value;
    },
  },
  actions: {
    setSelectedTargetItem({ commit }, value: string) {
      commit('setSelectedTargetItem', value);
    },
  },
  modules: {
  },
});
