<template>
  <card class="news card mt-3 px-3 t-dark2" :model="card">
    <template #card-content>
      <slot name="card-banner"></slot>
      <card-nav ref="nav" class="nav fs-md t-title" 
      :navs="categories.map(item => item.name)" 
      @handleClick="(item,i) => $refs.swiper.$swiper.slideTo(i)">
      </card-nav>
      <swipper class="fs-lg t-title" ref="swiper" 
      :swiper="`${cardName}-swiper`" :options="swiperOptions">
        <swipper-slide v-for="(category,i) in categories" :key="i">
          <slot name="list-item" :cate="category"></slot>
        </swipper-slide>
      </swipper>
    </template>
  </card>
</template>
<script>

import card from 'components/common/Card/card.vue'
import nav from 'components/common/NavBar/navbar.vue'
import swipper from 'components/common/Swipper/swipper.vue'
import swipperSlide 
from 'components/common/Swipper/swipperSlide.vue'

export default {
  props: {
    title: String,
    icon: String,
    icon_more: String,
    categories: Array, //轮播内容数据
    cardName: String, //用于区分swiper
  },
  data() {
    const swiperOptions = { //轮播图配置参数
      autoplay: false,
      loop: false,
      autoHeight: true,
      pagination: false,
      spaceBetween : this.cardName ? 20 : 0,
      on: {
        slideChange: () => {
          this.$refs.nav.activeIndex = this.$refs.swiper.$swiper.realIndex;
        }
      }
    };
    const card = {  //卡片配置参数
      title: this.title,
      icon: this.icon,
      icon_more: this.icon_more
    };
    return {
      slideIndex: 0,
      swiperOptions,
      card
    }
  },
  components: {
    card,
    cardNav: nav,
    swipper,
    swipperSlide
  }
}
</script>
<style scoped lang="scss">
// 卡片 header
.card ::v-deep {
  background-color: map-get($bgColors, "white");

  >.card-header {
    height: 2.963rem;
    font-size: 0.963rem;
    border-bottom: 1px solid map-get($bdColors, grey);

    [class *="sprite-"] {
      margin-right: 0.3704rem;
      margin-top: -0.0741rem;
    }
  }
}

//卡片 子导航
.nav ::v-deep {
  .nav-item {
    height: 2.8889rem;
    line-height: 2.8889rem;

    >.item-title {
      padding-bottom: 0.1667rem;
    }

    &.active {
      >.item-title {
        color: map-get($colors, theme);
        border-bottom: 0.1667rem solid map-get($colors, "theme");
      }
    }
  }
}

</style>