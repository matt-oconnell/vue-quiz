<template>
  <div>
    <h1>Question!</h1>
    <div v-html="question"></div>
    <el-button v-for="(answer, i) in answers" :plain="answered && selectedAnswer === i" :disabled="answered" @click="submit(i)">
      {{answer}}
    </el-button>
    <p v-if="answered">
      {{explanation}}
    </p>
    <p><strong v-if="answerStatus === 'correct'">Correct!</strong></p>
    <p><strong v-if="answerStatus === 'incorrect'">Wrong!</strong></p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import markdown from '../modules/markdown';
import '../../static/codestyle.css';

export default {
  data() {
    return {
      selectedAnswer: 0
    };
  },
  computed: {
    ...mapState({
      answers: s => s.question.answers,
      answered: s => s.question.answered,
      answerStatus: s => s.answerStatus,
      explanation: s => s.question.explanation,
      question: (s) => {
        return markdown.render(s.questionText) || '';
      }
    })
  },
  methods: {
    submit(i) {
      this.selectedAnswer = i;
      this.$store.dispatch('submitAnswer', i);
    }
  }
};
</script>

<style media="screen">
  code {
    font-size: 12px;
  }
  h1 {
    text-align: center;
  }
</style>
