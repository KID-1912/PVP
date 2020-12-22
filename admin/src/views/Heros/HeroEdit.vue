<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save()">
      <el-tabs type="border-card" value="info">
        <el-tab-pane label="基本信息" name="info">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="图标">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeader()" 
              :show-file-list="false"
              :on-success="result => $set(model,'avatar',result.url)">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="banner">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeader()" 
              :show-file-list="false" 
              :on-success="result => $set(model,'banner',result.url)">
              <img v-if="model.banner" :src="model.banner" class="banner">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="职业">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate 
            v-model="model.scores.difficult" 
            style="margin-top: 0.8rem"
            :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate 
            v-model="model.scores.skills" 
            style="margin-top: 0.8rem"
            :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate 
            v-model="model.scores.attack" 
            style="margin-top: 0.8rem"
            :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate 
            v-model="model.scores.survive" 
            style="margin-top: 0.8rem"
            :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="顺风装备">
            <el-select v-model="model.items1" :multiple-limit="6" multiple>
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风装备">
            <el-select v-model="model.items2" :multiple-limit="6" multiple>
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="model.usageTips">
            </el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="model.battleTips">
            </el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="model.teamTips">
            </el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能信息" name="skills">
          <el-button type="text" size="small" 
          @click="model.skills.push({})">
            <i class="el-icon-plus"></i> 添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeader()" 
                  :show-file-list="false"
                  :on-success="res => $set(item,'icon',res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                @click="model.skills.splice(i,1)"
                type="danger" size="small">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="英雄关系" name="related">
          <h4>最佳搭档</h4>
          <el-button type="text" size="small" 
          @click="model.parter.length<2 && model.parter.push({})">
            <i class="el-icon-plus"></i> 添加英雄
          </el-button>
          <el-row type="flex">
            <el-col :md="12" v-for="(item,i) in model.parter" :key="i">
              <el-form-item label="英雄">
                <el-select v-model="item.hero" filterable>
                  <el-option
                    v-for="item in heros"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                @click="model.parter.splice(i,1)"
                type="danger" size="small">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top: 1rem;text-align: center" label-width="0">
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mixinUpload} from 'common/mixin'
  // 请求模块
  import {getCategories} from 'network/category'
  import {getItems} from 'network/item'
  import {addHero,getHero,updateHero,getHeros} from 'network/hero'

  export default {
    props: {
      id: String
    },
    mixins: [mixinUpload],
    data(){
      return {
        uploadUrl: "http://localhost:3000/admin/api/upload",
        categories: [],
        items: [],
        heros: [],
        model: {
          scores: {
            difficult: 0,
            skills: 0,
            attack: 0,
            survive: 0,
          },
          skills: [],
          parter: []
        }
      }
    },
    methods: {
      async fetch(){
        let result = await getHero(this.id);
        this.model = Object.assign({},this.model,result );
      },
      async save(){
        if(this.id){
          await updateHero(this.id,this.model);
        }else{
          await addHero(this.model);
        }
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        this.id && this.$router.push('/heros/list')
      }
    },
    created(){
      // 请求编辑选项所需的数据
      getCategories().then(result => this.categories = result),
      getItems().then(result => this.items = result)
      getHeros().then(result => this.heros = result)
      this.id && this.fetch();
    }


  }
</script>

<style scoped>
</style>