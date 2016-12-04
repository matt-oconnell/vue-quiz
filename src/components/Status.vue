<template>
  <el-row class="status" :span="24">
    <el-progress :percentage="percentageAnswered"></el-progress>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters([
    'answered',
    'percentageCorrect',
    'percentageAnswered',
  ])
};
</script>

<style lang="css">

.el-progress-bar {
  margin-right: -50px;
  padding-right: 50px
}

</style>
