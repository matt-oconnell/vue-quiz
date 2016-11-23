<template>
  <div class="status">
    <p>Questions Answered: {{answered}}</p>
    <p>Percentage Correct: {{percentageCorrect}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters([
    'answered',
    'percentageCorrect',
  ]),
};
</script>
