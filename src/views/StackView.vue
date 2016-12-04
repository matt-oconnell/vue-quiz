<template>
  <div>
    <div v-html="func"></div>
    <div class="buttons">
      <el-button @click="lastStep()">LAST</el-button>
      <el-button @click="nextStep()">NEXT</el-button>
    </div>
    <h4>Current Step</h4>
    <el-table :data="currentStep" style="width: 100%">
      <el-table-column prop="i" label="I"></el-table-column>
      <el-table-column prop="event" label="Event"></el-table-column>
      <el-table-column prop="line" label="Line"></el-table-column>
      <el-table-column prop="stdout" label="stdout"></el-table-column>
    </el-table>
    <h4>Current Stack</h4>
    <el-table :data="currentStack" style="width: 100%">
      <el-table-column prop="function" label="Function"></el-table-column>
      <el-table-column prop="frame" label="Frame"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import markdown from '../modules/markdown';

export default {
  created: function created() {
    this.$store.dispatch('getCode');
  },
  methods: {
    nextStep() {
      this.$store.dispatch('updateCodeI', this.$store.state.codeI + 1);
    },
    lastStep() {
      this.$store.dispatch('updateCodeI', this.$store.state.codeI - 1);
    }
  },
  computed: mapState({
    currentStep: (s) => {
      if (s.code && s.code.trace[s.codeI]) {
        const cur = s.code.trace[s.codeI];
        return [{
          i: s.codeI,
          event: cur.event,
          line: cur.line,
          stdout: cur.stdout
        }];
      }
      return [{}];
    },
    currentStack: (s) => {
      if (s.code && s.code.trace[s.codeI]) {
        const current = s.code.trace[s.codeI].stack_to_render.map((el) => {
          return {
            frame: el.frame_id,
            function: el.func_name
          };
        });
        return current;
      }
      return [{}];
    },
    trace: s => s.code ? s.code.trace : [],
    func: (s) => {
      if (s.code) {
        const funcStr = s.code.code;
        const funcTmpl = `\`\`\`js
${funcStr}`;
        return markdown.render(funcTmpl);
      }
      return '';
    }
  })
};
</script>

<style media="screen">
  .buttons {
    margin-top: 25px;
    text-align: center;
  }
</style>
