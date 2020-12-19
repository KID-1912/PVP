<template>
  <div>
    <h1>{{this.id ? '编辑' : '新建'}}管理员</h1>
    <el-form 
    label-width="120px" @submit.native.prevent="save">
      <el-form-item label="账号名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  // 请求方法
  import {addAdminUser,getAdminUser,updateAdminUser} 
  from 'network/adminUser'

  export default {
    props: {
      id: String
    },
    data(){
      return {
        model: {},  // 当前编辑的Category数据
      }
    },
    created(){
      // 编辑状态获取原数据
      this.id && this.fetch();
    },
    methods: {
      // 提交表单发送Category请求
      async save(){
        if(this.id) {
          // 发送修改指定Id的Category的请求
          await updateAdminUser(this.id,this.model);
        }else{
          // 发送添加Category记录的请求
          await addAdminUser(this.model);       
        }
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        this.id && this.$router.push('/admin_users/list')
      },
      // 发送查询指定Id的Category的请求
      async fetch(){
        this.model = await getAdminUser(this.id);
      },
    }
  }
</script>

<style scoped>
  
</style>