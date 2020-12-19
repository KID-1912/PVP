<template>
  <el-table :data="ads">
    <el-table-column prop="_id" label="ID" width="250">
    </el-table-column>
    <el-table-column prop="name" label="广告栏">
    </el-table-column>
    <el-table-column 
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button
        @click="$router.push(`/ads/edit/${scope.row._id}`)"
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
  import {getAds,removeAd} from 'network/ad.js'
  export default {
    data(){
      return {
        ads: []
      }
    },
    methods: {
      async fetch(){
        this.ads = await getAds();
      },
      remove(rowData){
        this.$confirm(`是否删除英雄"${rowData.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await removeAd(rowData._id);
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