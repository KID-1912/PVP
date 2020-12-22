<template>
  <div>
    <h4>{{this.id ? '编辑' : '新建'}}广告栏</h4>
    <el-form label-width="120px" @submit.native.prevent="save()">
      <el-form-item label="广告栏名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-button type="text" size="small" @click="model.items.push({})">
        <i class="el-icon-plus"></i> 添加广告项
      </el-button>
      <el-row type="flex" style="flex-wrap: wrap">
        <el-col :md="12" v-for="(item,i) in model.items" :key="i">
          <el-form-item label="标题">
            <el-input v-model="item.title"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload 
            class="avatar-uploader" 
            :headers="getAuthHeader()" 
            :action="uploadUrl" :show-file-list="false" 
            :on-success="res => $set(item,'image',res.url)">
              <img v-if="item.image" :src="item.image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="链接(URL)">
            <el-input v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button 
            @click="model.items.splice(i,1)" 
            type="danger" size="small">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button 
        type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mixinUpload} from 'common/mixin'

  // 请求模块
  import {addAd,getAd,updateAd} from 'network/ad'
  
  export default {
    props: {
      id: String
    },
    mixins: [mixinUpload],
    data(){
      return {
        model: {
          items: []
        },
      }
    },
    methods: {
      async save(){
        if(this.id){
          await updateAd(this.id,this.model)
        }else{
          await addAd(this.model);
        }
        this.$message({
          type: 'success',
          message: '保存成功!'
        });
      },
      async fetch(){
        this.model = await getAd(this.id);
      }
    },
    created(){
      this.id && this.fetch();
    }
  }
</script>