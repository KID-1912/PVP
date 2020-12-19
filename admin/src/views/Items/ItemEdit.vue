<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save()">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeader()"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mixinUpload} from 'common/mixin'
  // 请求模块
  import {addItem,getItem,updateItem} from 'network/item'

  export default {
    props: {
      id: String
    },
    mixins: [mixinUpload],
    data(){
      return {
        uploadUrl: "http://localhost:3000/admin/api/upload",
        model: {}
      }
    },
    methods: {
      async fetch(){
        this.model = await getItem(this.id);
      },
      afterUpload(result){ //上传完成显示上传的图片
        this.$set(this.model,'icon',result.url);
      },
      async save(){
        if(this.id){
          await updateItem(this.id,this.model);
        }else{
          await addItem(this.model);
        }
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        this.id && this.$router.push('/items/list')
      }
    },
    created(){
      this.id && this.fetch();
    }


  }
</script>

<style scoped>

</style>