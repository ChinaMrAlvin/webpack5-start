<template>
  <div class="hello">
    <router-link to="./charts">hello JsonServer</router-link>
   <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="avatar"
        label="头像"
       >
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
       >
      </el-table-column>
      <el-table-column
        prop="email"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="tel">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';

import HelloDataType from './type';

@Component
export default class HelloWorld extends Vue {
  loading: boolean = true;
  tableData: HelloDataType[] = []

  async created() {
    const {data} = await this.sendRequest();
    this.loading = false;
    this.tableData = data;
  }

  async sendRequest() {
    return await axios.get("/api/people") as any;
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
