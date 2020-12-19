<template>
  <swipper swiper="home-swiper">
    <swipper-slide v-for="item in banners.items" :key="item._id">
      <img class="w-100" :src="item.image">
    </swipper-slide>
  </swipper>
</template>
<script>
  import {getBanners} from 'network/home.js'

  import swipper from 'components/common/Swipper/swipper.vue'
  import swipperSlide from 'components/common/Swipper/swipperSlide.vue'
  export default {
    data(){
      return {banners:{}}
    },
    methods: {
      async fetch(){
        this.banners = await getBanners();
      }
    },
    created(){
      this.fetch();
    },
    components: {
      swipper,
      swipperSlide
    }
  }
</script>
<style lang="scss" scoped>
  .home-swiper ::v-deep {
    > .swiper-pagination{
      text-align: right;
      padding-right: 1.0rem;
      > .swiper-pagination-bullet{
        height: 0.5185rem;
        width: 0.5185rem;
        border-radius: 30%;
        background: map-get($colors,"white");
        opacity: 1;
        &.swiper-pagination-bullet-active{
          background-color: map-get($bgColors,dpBlue);
        }
      }
    }
  }
</style>