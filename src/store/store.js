import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  currentQuestion: 0,
};

const mutations = {
  NEXT_QUESTION(state) {
    state.currentQuestion++;
  },
  LAST_QUESTION(state) {
    state.currentQuestion--;
  },
};

const actions = {
  nextQuestion: ({ commit }) => commit('NEXT_QUESTION'),
  lastQuestion: ({ commit }) => commit('LAST_QUESTION'),
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
});
