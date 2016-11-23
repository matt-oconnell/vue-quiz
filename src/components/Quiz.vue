<template>
  <div id="toolbar">
    <h1>{{$store.state.currentQuestion}}</h1>
    <button @click="lastQuestion">Last Question</button>
    <button @click="nextQuestion">Next Question</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: mapActions([
    'nextQuestion',
    'lastQuestion',
  ]),
};
</script>
