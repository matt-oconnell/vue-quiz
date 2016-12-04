import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import questions from '../data/questions';

Vue.use(Vuex);
Vue.use(VueResource);

const state = {
  code: null,
  codeI: 0,
  questions,
  questionI: 0,
  question: {},
  questionText: '',
  explanationText: '',
  answerStatus: '',
  status: {
    answered: 0,
    correctAnswers: 0,
  }
};

const mutations = {
  UPDATE_CODE_I(state, { i }) {
    state.codeI = i;
  },
  UPDATE_QUESTION(state, { questionMd, explanationMd, i }) {
    state.questionText = questionMd;
    state.explanationText = explanationMd;
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
  },
  UPDATE_CODE(state, { code }) {
    state.code = code;
  }
};

const actions = {
  gotoQuestion: ({ commit, state }, i) => {
    if (i < state.questions.length && i >= 0) {
      const questionP = Vue.http.get(`/questions/${i}`);
      const explanationP = Vue.http.get(`/explanations/${i}`);
      Promise.all([questionP, explanationP])
      .then(([questionMd, explanationMd]) => {
        commit('UPDATE_QUESTION', {
          questionMd: questionMd.body,
          explanationMd: explanationMd.body,
          i
        });
      });
    }
  },
  getCode: ({ commit }) => {
    Vue.http.get('/test').then((res) => {
      commit('UPDATE_CODE', {
        code: JSON.parse(res.body)
      });
    });
  },
  updateCodeI: ({ commit }, i) => {
    if (state.code && i < state.code.trace.length && i >= 0) {
      commit('UPDATE_CODE_I', { i });
    }
  },
  submitAnswer: ({ commit, state }, i) => {
    if (state.question.answerIndex === i) {
      commit('CORRECT_ANSWER');
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
