<template>
  <div>
    <!-- 轮播图 -->
    <home-swipper swiper="home-swiper"/>
    <!-- 图标导航 -->
    <home-nav/>
    <!-- card内容 -->
    <!-- 新闻 -->
    <home-card cardName="news"
    title="新闻资讯" class="news-card" :categories="news.slice(0,5)" 
    icon="sprite cart-sprite sprite-news" icon_more="sprite sprite-more">
      <template #card-banner>
        <div v-if="cardBanner.items" class="mt-1 px-1" 
        @click="$router.push('article/'+cardBanner.items[0].url)">
          <img class="w-100" :src="cardBanner.items[0].image">
        </div>
      </template>
      <template #list-item="list">
        <ul>
          <li v-for="(item,i) in list.cate.newslist" :key="i">
            <router-link class="list-item a-block" 
            :to="`article/${item._id}`">
              <span class="fs-sm" 
              :class="getCateStyle(item.categoryName)">
                {{item.categoryName}}
              </span>
              <span class="news-title t-ellipsis">{{item.title}}</span>
              <span class="news-date t-grey2 fs-sm">
                {{item.updatedAt | date}}
              </span>
            </router-link>
          </li>
        </ul>
      </template>
    </home-card>

    <!-- 英雄 -->
    <home-card cardName="hero" 
    title="英雄列表" class="heroes-card" :categories="heroes" 
    icon="sprite cart-sprite sprite-hero" icon_more="sprite sprite-more">
      <template #list-item="list">
        <ul class="d-flex flex-wrap">
          <li class="list-item fs-sm t-dark2 t-center" 
          v-for="(item,i) in list.cate.heroeslist" :key="i">
<!--             <router-link class="a-block" :to="`/hero/${item._id}`">
              <img class="w-100" :src="item.avatar">
              <h5>{{item.name}}</h5>
            </router-link> -->
            <div @click="$router.push(`/hero/${item._id}`)">
              <img class="w-100" :src="item.avatar">
              <h5>{{item.name}}</h5>
            </div>
          </li>
        </ul>
      </template>
    </home-card>

    <!-- 视频 -->
    <home-card cardName="video" 
    title="热门视频" class="videos-card" :categories="videos" 
    icon="sprite cart-sprite sprite-video" icon_more="sprite sprite-more" ref="video-card">
      <template #list-item="list">
        <ul class="d-flex flex-wrap jc-between">
          <li class="list-item mb-2 fs-md t-dark2" 
          v-for="(item,i) in list.cate.videolist" :key="i">
            <router-link class="a-block" :to="`/video/${item._id}`">
              <img class="bd-filt w-100" :src="item.banner">
              <h5 class="video-title mt-1">{{item.title}}</h5>
              <div class="d-flex jc-between fs-sm t-grey2">
                <span><i class="sprite sprite-playCount mx-1"></i>{{item.playCount}}</span>
                <span class="mr-1">{{item.updateAt | date2}}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </template>
    </home-card>

  </div>
</template>
<script>
  import dayjs from 'dayjs'
  // 请求
  import {getNewsList,getHeroesList,getCardBanner,getVideoList} from 'network/home.js'

  // 组件
  import homeSwipper from './childComps/homeSwipper.vue'
  import homeNav from './childComps/homeNav.vue'
  import homeCard from './childComps/homeCard.vue'

  export default {
    name: 'Home',
    data() {
      return {
        news: [],
        heroes: [],
        videos: [],
        cardBanner: {}
      }
    },
    filters: {
      date(val){
        return dayjs(val).format("MM/DD");
      },
      date2(val){
        return dayjs(val).format("M-D");
      }
    },
    methods: {
      getCateStyle(cate){
        let cateStyle = "cate-";
        switch (cate) {
          case "热门": 
          case "活动": cateStyle += 'hot';
          break;
          case "新闻": cateStyle += 'news';
          break;
          case "公告": cateStyle += 'notice';
          break;
          case "赛事": cateStyle += 'match';
          break;
        }
        return cateStyle;
      },
      async fetch(){
        this.news = await getNewsList();
        this.heroes = await getHeroesList();
        this.cardBanner = await getCardBanner();
        this.videos = await getVideoList();
        // 数据请求完成更新轮播图
        setTimeout(() => this.$refs['video-card'].$refs.swiper.$swiper.update(),200)
      }
    },
    created(){
      this.fetch();
    },
    mounted(){
      // console.log();
    },
    components: {
      homeSwipper,
      homeNav,
      homeCard
    }
  }
</script>
<style scoped lang="scss">
// 导航
.home-nav ::v-deep {
  .item-title {
    padding: 2px;
    border-bottom: 3px solid map-get($colors, theme);
  };
  &.router-link-active>.item-title {
    border-bottom-color: map-get($colors, "white");
  }
}

// news卡片
.news-card {
  ::v-deep.nav{
    margin: 0 -1.5rem;
  }
  .list-item{
    position: relative;
    white-space: nowrap;
    height: 2.1111rem;
    line-height: 2.1111rem;
    // 分类文本样式
    [class *= "cate-"]{
      padding: 1px 2px;
      border-width: 1px;
      border-style: solid;
      border-radius: 0.1389rem;
    }
    .cate-news{
      color: #1e96ab;
      border-color: #1e96ab;
    }
    .cate-notice{
      color: #f09a37;
      border-color: #f09a37;
    }
    .cate-hot{
      color: #ff3636;
      border-color: #ff3636;
    }
    .cate-match{
      color: #4d9cff;
      border-color: #4d9cff;
    }
    .news-title{
      position: absolute;
      right: 2.4rem;
      left: 2.2rem;
    }
    .news-date{
      position: absolute;
      display: inline-block;
      width: 1.7778rem;
      right: 0.2778rem;
    }
  }
}
// heros卡片
.heroes-card{
  ::v-deep.nav{
    margin: 0 -0.6rem;
  }
  .list-item{
    width: 17%;
    margin-bottom: 0.3rem;
    .list:not(:nth-child(4n)) {
        margin-right: calc(4% / 3);
    }
    &:not(:nth-of-type(5n)){
      margin-right: 3.75%;
    }
    h5{
      height: 1.6rem;
      line-height: 1.6rem;
    }
  }
}
// videos卡片
.videos-card{
  ::v-deep.nav{
    width: 80%;
    margin-left: -5%;
  }
  .list-item{
    width: 49%;
    line-height: 1.5;

    .video-title{
      @include t-ellipsis;
      height: 2.4rem;
    }

  }
}
</style>