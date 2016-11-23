import Vue from 'vue';
import Vuex from 'vuex';
import questions from '../data/questions';

Vue.use(Vuex);

const state = {
  questions,
  questionI: 0,
  question: {},
  answerStatus: '',
  status: {
    answered: 0,
    correctAnswers: 0,
  }
};

const mutations = {
  NEXT_QUESTION(state) {
    if (state.questionI < questions.length - 1) {
      state.questionI++;
    }
  },
  LAST_QUESTION(state) {
    if (state.questionI > 0) {
      state.questionI--;
    }
  },
  GOTO_QUESTION(state, i) {
    if (state.questions[i]) {
      state.questionI = i;
    }
  },
  UPDATE_QUESTION(state) {
    state.question = state.questions[state.questionI];
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
  nextQuestion: ({ commit }) => {
    commit('NEXT_QUESTION');
    commit('UPDATE_QUESTION');
  },
  lastQuestion: ({ commit }) => {
    commit('LAST_QUESTION');
    commit('UPDATE_QUESTION');
  },
  gotoQuestion: ({ commit }, i) => {
    commit('GOTO_QUESTION', i);
    commit('UPDATE_QUESTION');
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
  percentageCorrect: (state) => {
    const correct = state.status.correctAnswers;
    const answered = state.status.answered;
    const fraction = correct / answered || 0;
    const percentage = Math.round(fraction * 100);
    return `${percentage}%`;
  }
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
});
