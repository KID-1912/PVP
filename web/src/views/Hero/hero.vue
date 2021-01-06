<template>
  <div style="color: #343440;">
    <!-- topbar -->
    <div class="topbar d-flex al-center w-100 
    sprite sprite-topbar t-white fs-md">
      <div class="sprite sprite-logo"></div>
      <div class="ml-2">王者荣耀</div>
      <div class="flex-1 ml-3">攻略站</div>
      <div>
        <a href="javascript:;" style="font-size: 1.1852rem;">
          <span class="fl mr-1 fs-sm" style="line-height: 1.2963rem">
          更多英雄</span>&gt;</a></div>
    </div>
    <!-- banner -->
    <div v-if="model" 
    :style="{backgroundImage: `linear-gradient(rgba(0,0,0,0),
    rgba(0,0,0,1)),url(${model.banner})`}"
    class="banner d-flex flex-column jc-end p-3 t-white fs-sm">
      <div>{{model.title}}</div>
      <h2 style="font-size: 1.1111rem">
        <strong>{{model.name}}</strong></h2>
      <div style="margin:0.1667rem 0 0;">{{category}}</div>
      <div>
          <ul class="d-flex fs-xs">
            <li>难度<i class="score-icon icon-diff mx-1">{{model.scores.difficult}}</i>
            </li>
            <li>技能<i class="score-icon icon-skil mx-1">{{model.scores.skills}}</i>
            </li>
            <li>攻击<i class="score-icon icon-atck mx-1">{{model.scores.attack}}</i>
            </li>
            <li>生存<i class="score-icon icon-sur mx-1">{{model.scores.survive}}</i>
            </li>
          </ul>
      </div>
    </div>
    <!-- skill -->
    <div class="skills pt-3">
      <ul class="d-flex px-2 t-center">
        <li class="flex-1" 
        v-for="(item,i) in model.skills" :key="item._id" @click="index = i">
          <img :class="{active: i===index}" 
          :src="item.icon" class="skill-icon w-100">
        </li>
      </ul>
      <div v-if="model.skills.length" class="px-2">
        <div class="skill-title py-3">
          <strong>{{model.skills[index].name}}</strong></div>
        <div class="skill-des pb-2">{{model.skills[index].description}}</div>
      </div>
    </div>

    <!-- item出装 -->
    <card class="card-item px-2 pt-1 pb-2" :model="itemCard">
      <template #card-content>
        <div class="fs-xl mb-2">顺风出装</div>
        <div>
          <ul class="item1 d-flex t-center">
            <li class="flex-1" 
            v-for="item in model.items1" :key="item._id">
              <img class="item-icon" :src="item.icon">
              <div class="mt-1">{{item.name}}</div>
            </li>
          </ul>
        </div>
        <div class="fs-xl mb-2 mt-2">逆风出装</div>
        <div>
          <ul class="d-flex t-center">
            <li class="flex-1" 
            v-for="item in model.items2" :key="item._id">
              <img class="item-icon" :src="item.icon">
              <div class="mt-1">{{item.name}}</div>
            </li>
          </ul>
        </div>
      </template>
    </card>

    <!-- tip技巧 -->
    <card class="card-item px-2 pt-1 pb-2" 
    v-for="(tip,i) in tips" :model="tip" :key="i">
      <template #card-content>
        <p>{{model[tip.type]}}</p>
      </template>
    </card>

    <!-- 英雄关系 -->
    <card class="card-item px-2 pt-1 pb-2" :model="related">
      <template #card-content>
        <div class="fs-xl mb-2">最佳搭档</div>
        <div v-for="item in model.parter" class="d-flex mb-3" :key="item._id">
          <img class="relate-pic mr-2" :src="item.hero.avatar">
          <p class='flex-1'>{{item.description}}</p>
        </div>
      </template>
    </card>
  </div>
</template>

<script>
  import {getHero} from 'network/hero'

  import card from 'components/common/Card/card.vue'

  export default {
    name: 'Hero',
    props: {
      id: {required: true}
    },
    data(){
      return {
        model: {
          categories: [],
          scores: [],
          skills: []
        },
        index: 0,
        itemCard: {
          title: "出装推荐",
          icon: "icon icon-item"
        },
        tips: [
          {title: '使用技巧',icon: 'icon icon-usage',type: 'usageTips'},
          {title: '对抗技巧',icon: 'icon icon-battle',type: 'battleTips'},
          {title: '团战思路',icon: 'icon icon-team',type: 'teamTips'},
        ],
        related: {
          title: "英雄关系",
          icon: "icon icon-related"
        }
      }
    },
    computed: {
      category(){
        const cate = this.model.categories.reduce((arr,c) => {
          if(c.name !== '热门') arr.push(c.name);
          return arr;
        },[]);
        return cate.join('/');
      }
    },
    methods: {
      async fetch(){
        this.model = await getHero(this.id);
      }
    },
    created(){
      this.fetch();
    },
    components: {
      card,
    }
  }
</script>

<style scoped lang="scss">
  .topbar{
    position: fixed;
    padding: 0.46rem 1rem;
    top: 0;
    background-color: #000;
    z-index: 999;
  }
  .banner{
    position: relative;
    margin-top: 2.76rem;
    height: 11.7147rem; 
    // background: ;
    background-size: auto 100%;

    .score-icon{
      display: inline-block;
      padding: 0 0.3rem;
      line-height: 1.4;
      border: 0.0185rem solid rgba(0,0,0,.2);
      border-radius: 50%;
      transform: scale(0.7);
      &.icon-diff{
        background-color: #805300;
      }
      &.icon-skil{
        background-color: #1f3695;
      }
      &.icon-atck{
        background-color: #7a1b17;
      }
      &.icon-sur{
        background-color: #415129;
      }
    }
  }
  .skills{
    background-color: map-get($colors,"white");
    .skill-icon{
      width: 70%;
      margin-bottom: -0.0185rem;
      border-radius: 50%;
      border: 0.184rem solid transparent;
      padding-top: 0.025rem;
      &.active{
        border-color: map-get($colors,theme);
        background-color: map-get($colors,theme);
      }
    }
    .skill-title{
      font-size: 1.0rem;
    }
    .skill-des{
      line-height: 1.5;
    }
  }
  .card-item ::v-deep{
    line-height: 1.5;
    margin-top: 0.58rem;
    background-color: map-get($colors,"white");
    .item1{
      border-bottom: 1px solid map-get($bdColors,grey)
    }
    .card-title{
      color: #000;
      font-size: 0.9813rem;
      font-weight: bold;
      margin-left: 0.6133rem;
      line-height: 2.4;
    }
    .item-icon{
      width: 80%;
      border-radius: 50%;
    }
    .relate-pic{
      width: 2.944rem;
      height: 2.944rem;
    }
  }
</style>