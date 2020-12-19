<template>
  <el-table :data="heros">
    <el-table-column prop="_id" label="ID" width="250">
    </el-table-column>
    <el-table-column prop="name" label="名称">
    </el-table-column>
    <el-table-column prop="avatar" label="头像" width="300">
      <template slot-scope="scope">
        <img 
        class="icon-avatar" :src="scope.row.avatar">
      </template>
    </el-table-column>
    <el-table-column prop="title" label="称号">
    </el-table-column>
    <el-table-column 
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button
        @click="$router.push(`/heros/edit/${scope.row._id}`)"
        type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="删除"
      width="100">
      <template slot-scope="scope">
      <el-button
      @click="remove(scope.row)"
      type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import {getHeros,removeHero} from 'network/hero.js'
  export default {
    data(){
      return {
        heros: []
      }
    },
    methods: {
      async fetch(){
        this.heros = await getHeros();
      },
      remove(rowData){
        this.$confirm(`是否删除英雄"${rowData.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await removeHero(rowData._id);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch();
        })
      }
    },
    created(){
      this.fetch();
    }
  }
</script>

<style scoped>
</style>