<template>
  <div>
    <h1>{{this.id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  // 请求方法
  import {addCategory,getCategory,updateCategory,getCategories} 
  from 'network/category'

  export default {
    props: {
      id: String
    },
    data(){
      return {
        model: {},  // 当前编辑的Category数据
        parents: [] // 所有可选父分类
      }
    },
    created(){
      // 编辑状态获取原数据
      this.id && this.fetch();
      // 所有可选父分类获取
      this.queryParents();
    },
    methods: {
      // 提交表单发送Category请求
      async save(){
        if(this.id) {
          // 发送修改指定Id的Category的请求
          await updateCategory(this.id,this.model);
        }else{
          // 发送添加Category记录的请求
          await addCategory(this.model);       
        }
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        this.id && this.$router.push('/categorys/list')
      },
      // 发送查询指定Id的Category的请求
      async fetch(){
        this.model = await getCategory(this.id);
      },
      // 发送查询所有Category的请求
      async queryParents(){
        this.parents = await getCategories();
      }
    }
  }
</script>

<style scoped>
  
</style>