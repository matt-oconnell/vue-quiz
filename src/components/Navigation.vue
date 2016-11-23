<template>
  <div>
    <div>
      <a class="question" v-for="(_, i) in questions" @click="gotoQuestion(i)">
        goto: {{i}}
      </a>
    </div>
    <h1>{{$store.state.questionI}}</h1>
    <button @click="gotoQuestion(--$store.state.questionI)">Last Question</button>
    <button @click="gotoQuestion(++$store.state.questionI)">Next Question</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    questions() {
      return this.$store.state.questions;
    }
  },
  methods: mapActions([
    'gotoQuestion'
  ]),
};
</script>
