<template>
  <div>
    <el-button :disabled="questionI <= 0" @click="gotoQuestion(questionI - 1)">
      <i class="el-icon-arrow-left"></i>
    </el-button>
    <el-button v-for="(_, i) in questions" @click="gotoQuestion(i)" :type="isActive(i)">
      {{i}}
    </el-button>
    <el-button :disabled="questionI >= questions.length - 1" @click="gotoQuestion(questionI + 1)">
      <i class="el-icon-arrow-right"></i>
    </el-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    questionI() { return this.$store.state.questionI; },
    questions() { return this.$store.state.questions; }
  },
  methods: {
    isActive(i) {
      return this.$store.state.questionI === i ? 'primary' : '';
    },
    ...mapActions([
      'gotoQuestion'
    ])
  },
};
</script>

<style>
  .el-progress {
    margin-top: 15px;
  }
</style>
