<template>
  <div>
    <video class="video-player" :src="video.url" controls></video>
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
        <ul class="d-flex jc-between">
          <li class="commend-item" 
          v-for="item in video.next" :key="item._id">
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
      margin-top: 0.5rem;
      width: 32.2%;
      .commend-title{
        @include t-ellipsis;
      }
    }
  }
</style>