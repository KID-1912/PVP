<template>
  <div>
    <h1>{{this.id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.category" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <vue-editor v-model="model.body" 
        @image-added="handleImageAdded">
        </vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {request} from 'network/request.js'

  // 请求方法
  import {getCategories} from 'network/category'
  import {addArticle,updateArticle,getArticle} 
  from 'network/article'

  // 富文本编辑
  import { VueEditor} from "vue2-editor";

  export default {
    props: {
      id: String
    },
    data(){
      return {
        model: {},  // 当前编辑的文章数据
        categories: [] // 所有可选父分类
      }
    },
    created(){
      // 编辑状态获取原数据
      this.id && this.fetch();
      // 所有可选父分类获取
      this.queryCategories();
    },
    methods: {
      // 提交表单发送Article请求
      async save(){
        if(this.id) {
          // 发送修改指定Id的Article的请求
          await updateArticle(this.id,this.model);
        }else{
          // 发送添加Article记录的请求
          await addArticle(this.model);       
        }
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        this.id && this.$router.push('/articles/list')
      },
      // 查询当前编辑文字记录
      async fetch(){
        this.model = await getArticle(this.id);
      },
      // 查询所有文章类别作为可选项
      async queryCategories(){
        this.categories = await getCategories();
      },
      // 富文本编辑器图片编辑处理
      async handleImageAdded(file, Editor, cursorLocation, resetUploader){
        const formData = new FormData();
        formData.append("file",file);
        const result = await request({
          url: '/upload',
          method: "post",
          data: formData
        });
        console.log(result);
        Editor.insertEmbed(cursorLocation, "image", result.url);
        resetUploader();
      }
    },
    components: {
      vueEditor: VueEditor
    }
  }
</script>

<style scoped>
</style>