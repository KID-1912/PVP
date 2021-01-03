<template>
  <div>
    <topbar/>
    <navbar class="navbar bgc-theme fs-lg t-white" :navs="navs">
    </navbar>
    <router-view></router-view>
    <div class="copyright t-center fs-sm py-1">网站备案：鄂ICP备2020023380号</div>
    <img src="/qiniu.jpg">
  </div>
</template>

<script>
  import topbar from 'components/content/TopBar/topbar.vue'
  import navbar from 'components/common/NavBar/navbar.vue'
  export default {
    data(){
      const navs = [
        {title: "首页",path: "/"},
        {title: "攻略",path: "/raiders"},
        {title: " 赛事",path: "/match"}
      ];
      return {
        navs
      }
    },
    components: {
      topbar,
      navbar
    }
  }
</script>

<style lang="scss" scoped>
  .navbar ::v-deep{
    padding-top: 2.833rem;
    .nav-item{
      height: 2.5556rem;
      line-height: 2.5556rem;
      > .item-title{
        padding-bottom: 0.1667rem;
      }
    }
    &.active{
      > .item-title{
        border-bottom: 0.1667rem solid map-get($colors,"white");
      }
    }
  }
  .copyright{
    color: #fff;
    background-color: #ccc;
  }
</style>
