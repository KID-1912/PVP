<template>
  <el-table :data="items">
    <el-table-column prop="_id" label="ID" width="250">
    </el-table-column>
    <el-table-column prop="name" label="名称">
    </el-table-column>
    <el-table-column prop="icon" label="图标" width="300">
      <template slot-scope="scope">
        <img class="icon-item" :src="scope.row.icon" style="height: 3rem">
      </template>
    </el-table-column>
    <el-table-column 
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button
        @click="$router.push(`/items/edit/${scope.row._id}`)"
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
  import {getItems,removeItem} from 'network/item.js'
  export default {
    data(){
      return {
        items: []
      }
    },
    methods: {
      async fetch(){
        this.items = await getItems();
      },
      remove(rowData){
        this.$confirm(`是否删除物品"${rowData.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await removeItem(rowData._id);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch();
        })
      },
    },
    created(){
      this.fetch();
    }
  }
</script>

<style scoped>

</style>