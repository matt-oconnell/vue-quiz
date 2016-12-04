<template>
  <ul>
    <li v-for="(t, i) in trace">{{ t.stack_to_render }}</li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
  created: function created() {
    this.$store.dispatch('getCode');
  },
  computed: mapState({
    trace: s => (JSON.parse(s.code.body).trace) || []
  })
};
</script>
