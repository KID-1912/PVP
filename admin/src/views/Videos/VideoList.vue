<template>
  <el-table :data="videos">
    <el-table-column prop="_id" label="ID" width="250">
    </el-table-column>
    <el-table-column prop="title" label="标题">
    </el-table-column>
    <el-table-column label="所属分类" width="250">
      <template slot-scope="scope">
        <el-tag>
          {{scope.row.category.name}}
        </el-tag> 
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button 
        @click="$router.push(`/videos/edit/${scope.row._id}`)" 
        type="text" size="small">编辑</el-button>
        <el-button 
        @click="remove(scope.row)"
        type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import {getVideos,removeVideo} from 'network/video'

  export default {
    data(){
      return {
        videos: []
      }
    },
    created(){
      this.fetch();
    },
    methods: {
      // 删除指定参数id的Video记录
      remove(rowData){
        this.$confirm(`是否删除视频"${rowData.title}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await removeVideo(rowData._id);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch();
        })
      },
      // 请求所有Articles记录
      async fetch(){
        this.videos = await getVideos();
      }
    }
  }
</script>

<style scoped>
  
</style>