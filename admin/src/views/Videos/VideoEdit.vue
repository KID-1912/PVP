<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}视频</h1>
    <el-form label-width="120px" @submit.native.prevent="save()">
      <el-form-item label="视频分类">
        <el-select v-model="model.category" placeholder="视频分类">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="banner">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeader()"
          :show-file-list="false"
          :on-success="res => $set(model,'banner',res.url)">
          <img v-if="model.banner" :src="model.banner" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="链接">
        <el-input v-model="model.url"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mixinUpload} from 'common/mixin'
  import {addVideo,getVideo,updateVideo} from 'network/video'
  import {getCategories} from 'network/category'

  export default {
    props: {
      id: String
    },
    mixins: [mixinUpload],
    data(){
      return {
        categories: [],
        model: {}
      }
    },
    methods: {
      // 编辑视频的原纪录
      async fetch(){
        this.model = await getVideo(this.id);
      },
      // 提交视频记录
      async save(){
        if(this.id) {
          // 发送修改指定Id的Video请求
          await updateVideo(this.id,this.model);
        }else{
          // 发送添加Article记录的请求
          await addVideo(this.model);       
        }
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        this.id && this.$router.push('/videos/list');
      },
      // 查询所有视频类别作为可选项
      async queryCategories(){
        this.categories = await getCategories();
      },
    },
    created(){
      this.id && this.fetch();
      this.queryCategories();
    }
  }
</script>

<style scoped>
  
</style>