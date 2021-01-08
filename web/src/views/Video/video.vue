<template>
  <div>
    <!-- <video class="video-player" :src="video.url" controls></video> -->
    <embed wmode="direct" flashvars="vid=l32174xgyvg&amp;tpid=0&amp;showend=0&amp;showcfg=1&amp;searchbar=0&amp;skin=//imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf&amp;shownext=1&amp;list=2&amp;autoplay=0" :src="video.url" quality="high" name="tenvideo_flash_player_1610105590756" id="tenvideo_flash_player_1610105590756" bgcolor="#000000" width="640px" height="360px" align="middle" allowscriptaccess="always" allowfullscreen="true" type="application/x-shockwave-flash" pluginspage="http://get.adobe.com/cn/flashplayer/">
    <div class="video-info d-flex mt-2 mx-1 py-1">
      <div class="video-banner ml-1"><img :src="video.banner" class="w-100"></div>
      <div class="px-2">
        <h4>{{video.title}}</h4>
        <div class="mt-1 fs-sm t-grey2">
          <span>播放量：{{video.playCount}}</span>
          <span class="ml-1">发表时间：{{video.updateAt | date2}}</span></div>
      </div>
    </div>
    <card :model="card" class="commend-card mt-3 px-1">
      <template #card-content>
        <ul class="d-flex">
          <li class="commend-item" v-for="item in video.next" 
           @click="$router.replace(`/video/${item._id}`)" :key="item._id">
            <img :src="item.banner" class="w-100 bd-filt">
            <p class="commend-title mt-1 fs-sm t-grey2">{{item.title}}</p>
          </li>
        </ul>
      </template>
    </card>
  </div>
</template>

<script>
  import dayjs from 'dayjs'

  import card from 'components/common/Card/card.vue'

  import {getVideo} from 'network/video'

  export default {
    props: {
      id: String
    },
    data(){
      this.card = {
        icon: 'icon icon-usage',
        title: '猜你喜欢'
      };
      return {
        video: {}
      }
    },
    filters: {
      date2(val){
        return dayjs(val).format("M-D");
      }
    },
    methods: {
      async fetch(){
        this.video = await getVideo(this.id);
      }
    },
    created(){
      this.fetch();
    },
    components: {
      card
    }
  }
</script>

<style scoped lang="scss">
  .video-player{
    width: 100%;
  }
  .video-info{
    border: 1px solid map-get($bdColors,'light');
    > .video-banner{
      width: 50%;
    }
  }
  .commend-card {
    ::v-deep.card-title{
      margin-left: 0.5rem;
      color: map-get($colors,'dark');
      font-size: 0.736rem;
    }
    .commend-item{
      margin-top: .5rem;
      margin-right: .4rem;
      width: 32.2%;
      .commend-title{
        @include t-ellipsis;
      }
    }
  }
</style>