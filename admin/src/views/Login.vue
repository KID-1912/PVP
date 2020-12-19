<template>
    <el-card class="login">
      <div slot="header" class="clearfix">
        <span>登录</span>
      </div>
      <el-form label-width="5rem" 
      @submit.native.prevent="save">
        <el-form-item label="账号名">
          <el-input v-model="model.name" placeholder="admin"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input 
          v-model="model.password" 
          placeholder="123456" show-password></el-input>
        </el-form-item>
        <el-form-item label-width="0" style="text-align: center">
          <el-button type="primary" 
          native-type="submit">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
</template>

<script>
  import {login} from 'network/login'
  export default {
    data(){
      return {
        model: {}
      }
    },
    methods: {
      async save(){
        if(!this.model.name || !this.model.password) 
          return this.$message({
            message: '用户名密码不可为空',
            type: 'warning'
          });
        const res = await login(this.model);
        if(res){
          sessionStorage.token = res;
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style scoped>
  .login{
    width: 30rem;
    margin: 10rem auto;
  }
</style>