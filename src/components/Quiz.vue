<template>
  <div>
    <status></status>
    <hr>
    <navigation></navigation>
    <hr>
    <question></question>
  </div>
</template>

<script>
import Navigation from './Navigation';
import Question from './Question';
import Status from './Status';

export default {
  components: {
    Navigation,
    Question,
    Status,
  },
};
</script>
