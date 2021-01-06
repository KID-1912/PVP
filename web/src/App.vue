<template>
  <div id="app" class="pb-5">
    <!--  :key="$route.path" -->
    <keep-alive include="Main">
    <router-view/>

    </keep-alive>

    <!-- 备案号 -->
    <div class="copyright t-center fs-sm">网站备案：鄂ICP备2020023380号</div>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
  #app{
    position: relative;
    min-height: 100%;
    overflow-x: hidden;
  }
  .copyright{
    position: absolute;
    height: 1.0733rem;
    width: 100%;
    bottom: 0;
    color: #fff;
    line-height: 1.0733rem;
    background-color: #ccc;
  }
</style>
