<template>
  <el-table :data="articles">
    <el-table-column prop="_id" label="ID" width="250">
    </el-table-column>
    <el-table-column prop="title" label="标题">
    </el-table-column>
    <el-table-column label="所属分类" width="250">
      <template slot-scope="scope">
        <el-tag 
        v-for="(item,i) in scope.row.category" :key="i"
        style="margin: 0 .5rem">
          {{item.name}}
        </el-tag> 
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button 
        @click="$router.push(`/articles/edit/${scope.row._id}`)" 
        type="text" size="small">编辑</el-button>
        <el-button 
        @click="remove(scope.row)"
        type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import {getArticles,removeArticle} from 'network/article.js'

  export default {
    data(){
      return {
        articles: []
      }
    },
    created(){
      this.fetch();
    },
    methods: {
      // 删除指定参数id的Article记录
      remove(rowData){
        this.$confirm(`是否删除文章"${rowData.title}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await removeArticle(rowData._id);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch();
        })
      },
      // 请求所有Articles记录
      async fetch(){
        this.articles = await getArticles();
      }
    }




  }
</script>

<style scoped>
  
</style>