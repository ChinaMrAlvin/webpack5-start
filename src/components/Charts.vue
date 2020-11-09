<template>
  <div class="hello">
    charts module
   <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="time"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="value"
        label="值">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';

import ChartType from './type';

@Component
export default class Charts extends Vue {
  loading: boolean = true;
  tableData: ChartType[] = []

  async created() {
    const {data} = await this.sendRequest();
    this.loading = false;
    this.tableData = data;
  }

  async sendRequest() {
    return await axios.get("/api/charts") as any;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
