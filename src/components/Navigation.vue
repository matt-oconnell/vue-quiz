<template>
  <div>
    <div>
      <a class="question" v-for="(question, i) in $store.state.questions" @click="gotoQuestion(i)">
        goto: {{i}}
      </a>
    </div>
    <h1>{{$store.state.questionI}}</h1>
    <button @click="lastQuestion">Last Question</button>
    <button @click="nextQuestion">Next Question</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: mapActions([
    'gotoQuestion',
    'nextQuestion',
    'lastQuestion',
  ]),
};
</script>
