<template>
  <div>
    <div v-html="question"></div>
    <el-button v-for="(answer, i) in answers" :plain="!!answered && selectedAnswer !== i" :disabled="answered" @click="submit(i)">
      {{answer}}
    </el-button>
    <div v-if="answered" v-html="explanation"></div>
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
      question: (s) => {
        return markdown.render(s.questionText) || '';
      },
      explanation: (s) => {
        return markdown.render(s.explanationText) || '';
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

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  p {
    font-family: 'Source Sans Pro';
    font-size: 13px;
  }
  pre {
    border-radius: 4px;
  }
  code {
    font-size: 12px;
  }
  h1 {
    text-align: center;
  }
  .katex {
    font-size: 12px;
  }
</style>
