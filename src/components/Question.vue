<template>
  <div>
    <h1>Question!</h1>
    <p>{{$store.state.question.question}}</p>
    <div class="answers">
      <button type="button"
        v-for="(answer, i) in $store.state.question.answers"
        :disabled="$store.state.question.answered"
        @click="submitAnswer(i)"
      >
        {{answer}}
      </button>
    </div>
    <p>
      <em v-if="$store.state.question.answered">
        {{$store.state.question.explanation}}
      </em>
    </p>
    <p><strong v-if="$store.state.answerStatus === 'correct'">Correct!</strong></p>
    <p><strong v-if="$store.state.answerStatus === 'incorrect'">Wrong!</strong></p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: mapActions([
    'submitAnswer',
  ]),
};
</script>
