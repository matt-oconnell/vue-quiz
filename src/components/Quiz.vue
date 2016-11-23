<template>
  <div>
    <div class="status">
      <div>
        <a class="question" v-for="(question, i) in $store.state.questions" @click="gotoQuestion(i)">
          goto: {{i}}
        </a>
      </div>
      <div>
        <p>Questions Answered: {{answered}}</p>
        <p>Percentage Correct: {{percentageCorrect}}</p>
      </div>
    </div>
    <hr />
    <h1>{{$store.state.questionI}}</h1>
    <button @click="lastQuestion">Last Question</button>
    <button @click="nextQuestion">Next Question</button>
    <div>
      <question></question>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Question from './Question';

export default {
  computed: mapGetters([
    'answered',
    'percentageCorrect',
  ]),
  methods: mapActions([
    'nextQuestion',
    'lastQuestion',
    'gotoQuestion',
  ]),
  components: {
    Question,
  },
};
</script>
