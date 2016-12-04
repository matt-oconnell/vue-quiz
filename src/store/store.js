import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import questions from '../data/questions';

Vue.use(Vuex);
Vue.use(VueResource);

const state = {
  questions,
  questionI: 0,
  question: {},
  questionText: '',
  answerStatus: '',
  status: {
    answered: 0,
    correctAnswers: 0,
  }
};

const mutations = {
  UPDATE_QUESTION(state, { markdown, i }) {
    state.questionText = markdown;
    state.questionI = i;
    state.question = state.questions[i];
    state.answerStatus = '';
  },
  CORRECT_ANSWER(state) {
    state.answerStatus = 'correct';
    state.question.answered = true;
    state.status.answered++;
    state.status.correctAnswers++;
  },
  INCORRECT_ANSWER(state) {
    state.answerStatus = 'incorrect';
    state.question.answered = true;
    state.status.answered++;
  }
};

const actions = {
  gotoQuestion: ({ commit, state }, i) => {
    if (i < state.questions.length && i >= 0) {
      Vue.http
      .get(`/questions/${i}`)
      .then(({ body }) => {
        commit('UPDATE_QUESTION', {
          markdown: body,
          i
        });
      });
    }
  },
  submitAnswer: ({ commit, state }, i) => {
    if (state.question.answerIndex === i) {
      commit('CORRECT_ANSWER');
    } else {
      commit('INCORRECT_ANSWER');
    }
  }
};

const getters = {
  answered: state => `${state.status.answered} / ${state.questions.length}`,
  percentageAnswered: state => Math.round(state.status.answered / state.questions.length * 100),
  percentageCorrect: (state) => {
    const correct = state.status.correctAnswers;
    const answered = state.status.answered;
    const fraction = correct / answered || 0;
    return Math.round(fraction * 100);
  }
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
});
