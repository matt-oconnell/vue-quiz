<template>
  <div>
    <h1>Question!</h1>
    <p>{{question}}</p>
    <div>
      <div v-for="(answer, i) in answers">
        <button type="button" :disabled="answered" @click="submitAnswer(i)">
          {{answer}}
        </button>
      </div>
    </div>
    <p v-if="answered">
      {{explanation}}
    </p>
    <p><strong v-if="answerStatus === 'correct'">Correct!</strong></p>
    <p><strong v-if="answerStatus === 'incorrect'">Wrong!</strong></p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      answers: s => s.question.answers,
      answered: s => s.question.answered,
      answerStatus: s => s.answerStatus,
      explanation: s => s.question.explanation,
      question: s => s.question.question
    })
  },
  methods: mapActions([
    'submitAnswer',
  ]),
};
</script>
