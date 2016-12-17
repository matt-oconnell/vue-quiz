<template>
  <div>
    <pre class="hljs">
      <code>
        <div v-for="(line, i) in func" v-bind:class="{ active: currentStep[0].line == i + 1, last: currentStep[0].lastLine == i + 1 }" class="line">
          <span class="line-number">{{i + 1}}</span><span v-html="line"></span>
        </div>
      </code>
    </pre>
    <el-row>
      <el-col :span="8">
        <el-table :data="stdout">
          <el-table-column prop="stdout" label="stdout"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="8">
        <el-table :data="globals">
          <el-table-column prop="global" label="Ordered Globals"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
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
    stdout: (s) => {
      if (s.code && s.code.trace[s.codeI]) {
        const stdoutArr = s.code.trace[s.codeI].stdout.split('\n');
        return stdoutArr.map(stdout => ({ stdout })).filter(el => el.stdout);
      }
      return [{}];
    },
    globals: (s) => {
      if (s.code && s.code.trace[s.codeI]) {
        const currentGlobals = s.code.trace[s.codeI].ordered_globals.map((global) => {
          return { global };
        });
        return currentGlobals;
      }
      return [{}];
    },
    currentStep: (s) => {
      if (s.code && s.code.trace[s.codeI]) {
        const cur = s.code.trace[s.codeI];
        const last = s.code.trace[s.codeI - 1];
        return [{
          i: s.codeI,
          event: cur.event,
          line: cur.line,
          lastLine: last.line || -1,
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
        // fix this mess
        return markdown.render(funcTmpl).split('<code>')[1].split('</code>')[0].split('\n');
      }
      return '';
    }
  })
};
</script>

<style media="screen">
  code {
    white-space: pre-line;
  }
  .line {
    line-height: .8;
    padding: 2px 0;
    width: 100%;
  }
  .line.active {
    border: 1px solid white;
  }
  .line.last {
    border: 1px solid green;
  }
  .line-number {
    display: inline-block;
    width: 20px;
    white-space: normal;
    margin-right: 20px;
  }
  .buttons {
    margin-top: 25px;
    text-align: center;
  }
</style>