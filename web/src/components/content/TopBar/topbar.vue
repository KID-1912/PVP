<template>
  <div class="topbar d-flex al-center pt-2 pb-1 px-3 w-100 
  sprite sprite-topbar">
    <div class="sprite sprite-logo"></div>
    <div class="flex-1 t-white ml-2">
      <div class="fs-lg">王者荣耀</div>
      <div class="fs-sm t-gray">团队成就更多</div>
    </div>
    <button class="sprite sprite-download bgc-theme as-start"></button>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped lang="scss">
  .topbar{
    position: fixed;
    max-width: 1080px;
    background-color: #000;
    z-index: 999;
  }
</style>