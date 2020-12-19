<template>
  <div>
    <ul class="d-flex t-center">
      <li 
      class="flex-1" 
      v-for="(item,i) in navs" :key="i">
        <a :href="item.url || 'javascript:;'" 
        class="nav-item a-block" :class="{active:i == activeIndex}" 
        @click="handleClick(item,i)" :target_blank="isTarget">
          <span class="item-title">{{item.title || item}}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
// navs 导航数据，其中title为导航标题文本，link为链接地址（可选），path为路由路径
// isTarget 否导航至目标，路由状态即push路由，锚点状态则新开标签页
// index 默认激活导航项的索引
  export default {
    props: {
      index: {  //父组件传递的默认激活索引
        default: 0,
        type: Number
      },
      navs: Array,
      isTarget: {
        default: true,
        type: Boolean
      },
    },
    data(){
      return {
        activeIndex: this.index
      }
    },
    methods: {
      handleClick(item,i){
        this.activeIndex = i;
        if(item.path) 
          return this.isTarget ? 
          this.$router.push(item.path) : 
          this.$router.replace(item.path);
        this.$emit("handleClick",item,i);
      }
    }
  }
</script>


<style scoped lang="scss">


</style>