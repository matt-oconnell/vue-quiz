<template>
  <div>
    <status></status>
    <navigation></navigation>
    <question></question>
  </div>
</template>

<script>
import Navigation from './Navigation';
import Question from './Question';
import Status from './Status';

export default {
  created: function created() {
    this.$store.dispatch('gotoQuestion', 0);
  },
  components: {
    Navigation,
    Question,
    Status,
  },
};
</script>
