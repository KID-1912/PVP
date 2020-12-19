<template>
  <el-table :data="categories">
    <el-table-column prop="_id" label="ID" width="250">
    </el-table-column>
    <el-table-column prop="parent.name" label="上级分类">
    </el-table-column>
    <el-table-column prop="name" label="分类名称">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button 
        @click="$router.push(`/categorys/edit/${scope.row._id}`)" 
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
  import {getCategories,removeCategory} from 'network/category.js'

  export default {
    data(){
      return {
        categories: []
      }
    },
    created(){
      this.fetch();
    },
    methods: {
      // 删除指定参数id的Category记录
      remove(rowData){
        this.$confirm(`是否删除分类"${rowData.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await removeCategory(rowData._id);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch();
        })
      },
      // 请求所有Categorys记录
      async fetch(){
        this.categories = await getCategories();
      }
    }




  }
</script>

<style scoped>
  
</style>