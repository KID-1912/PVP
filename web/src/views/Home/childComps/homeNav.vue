<template>
    <div class="home-nav t-center">
      <ul class="d-flex flex-wrap mt-3 pt-2 fs-sm t-title" :class="{'drop-up': !isDown}">
        <li class="nav-item" 
        v-for="(item,i) in navs" :key="i">
          <a :href="item.url" 
          class="d-flex flex-column jc-center al-center h-100">
            <i class="sprite pb-1 nav-sprite" :class="'sprite-'+item.icon"></i>
            <div>{{item.title}}</div>
          </a>
        </li>
      </ul>
      <div class="nav-toggle w-100 mt-2" @click="isDown=!isDown">
        <span><i class="sprite sprtie-arrow-bottom" :class="{'sprtie-arrow-top': !isDown}"></i>{{isDown?"收起":"展开"}}</span>
      </div>
    </div>
</template>

<script>
  const navs = [
    {title: '爆料站',url: '',icon: 'blz'},
    {title: '故事站',url: '',icon: 'gsz'},
    {title: '周边商城',url: '',icon: 'zbsc'},
    {title: '体验服',url: '',icon: 'tyf'},
    {title: '新人专区',url: '',icon: 'xrzq'},
    {title: '荣耀·传承',url: '',icon: 'rycc'},
    {title: '王者营地',url: '',icon: 'wzyd'},
    {title: '公众号',url: '',icon: 'gzh'},
    {title: '版本介绍',url: '',icon: 'bbjs'},
    {title: '对局环境',url: '',icon: 'djhj'},
    {title: '无限王者团',url: '',icon: 'wxwzt'},
    {title: '创意互动营',url: '',icon: 'cyhdy'},
  ]
  export default {
    data(){
      return {
        navs,
        isDown: false
      }
    }
  }
</script>

<style scoped lang="scss">
  .home-nav{
    background-color: #fff;
    .drop-up{
      height: 3.3733rem;
      overflow: hidden;
    }
    .nav-item{
      width: 25%;
      height: 2.7778rem;
      &:not(:nth-child(4n+1)){
        border-left: 1px solid map-get($bdColors,grey);
      }
      &:not(:nth-last-of-type(-n+5)){
        margin-bottom: 1.2222rem;
      }
    }
    > .nav-toggle{
      height: 1.8333rem;
      line-height: 1.8333rem;
      background-color: map-get($bgColors,light);
      cursor: default;
      .sprtie-arrow-bottom{
        margin-right: 0.2778rem;
      }
      i.sprtie-arrow-top{
        transform: rotate(180deg);
      }
    } 
  }

  
</style>