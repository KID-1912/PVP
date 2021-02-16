<template>
  <div :class="swiper" class="swiper-container">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <!-- pagination -->
    <div v-show="defaults.pagination" 
    class="swiper-pagination"></div>
  </div>
</template>
<script>
// 引入 Swiper 样式
import 'swiper/swiper-bundle.css';

// 引入Swiper组件 和 附加模块
import Swiper, { Pagination, Autoplay } from 'swiper';

// 应用功能模块
Swiper.use([Pagination, Autoplay]);

export default {
  props: {
    swiper: String,
    options: {
      type: Object,
      defaults: {}
    }
  },
  data() {
    return {
      $swiper: {}, //swiper轮播图对象
      defaults: { // 默认参数配置
        speed: 400,
        loop: true,
        observer: true,
        observeSlideChildren: true,
        observeParents:true,
        autoplay: {
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        }
      }
    }
  },
  mounted() {
    // 覆盖默认配置参数
    const options = Object.assign(this.defaults,this.options);
    setTimeout(() => {
      this.$swiper = new Swiper(`.swiper-container.${this.swiper}`,options);
    },600)
  },
};
</script>
<style scoped lang="scss">
// .swiper-slide-active { height:auto}
</style>