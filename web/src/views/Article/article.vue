<template>
  <div>
    <div class="header d-flex al-center px-2">
      <button class="icon icon-left h-100" 
      @click.prevent="$router.back()"></button>
      <h2 class="flex-1 ml-2 fs-md t-blue t-ellipsis">
        <strong>{{model.title}}</strong>
      </h2>
      <span class="pl-2 fs-sm t-date">{{model.updatedAt | date}}</span>
    </div>
    <div class="body fs-xl px-4" v-html="model.body"></div>
    <card class="px-4 fs-lg" :model="card">
      <template #card-content>
        <div>
          <div v-for="(item,i) in model.next" :key="i">
            <router-link 
            class="d-flex al-center" :to="`/article/${item._id}`">
              <p class="flex-1 t-ellipsis">{{item.title}}</p>
              <span class="pl-3 fs-sm t-date">
                {{item.updateAt | date}}</span>
              </router-link>
          </div>
        </div>
      </template>
    </card>
  </div>
</template>

<script>
  import {getArticle} from 'network/article'

  import dayjs from 'dayjs'

  import card from 'components/common/Card/card.vue'

  export default {
    props: {
      id: {required: true}
    },
    data(){
      return {
        model: {
          next: []
        },
        card: {
          title: "相关资讯",
          icon: "icon icon-lin"
        }
      }
    },
    filters: {
      date(val){
        return dayjs(val).format('YYYY-MM-DD');
      }
    },
    methods: {
      async fetch(){
        this.model = await getArticle(this.id);
      }
    },
    created(){
      this.fetch();
    },
    watch: {
      id: "fetch"
    },
    components: {
      card
    }
  }
</script>

<style scoped lang="scss">
  .header{
    height: 2.2896rem;
    border-bottom: 1px solid map-get($bdColors,grey);
  }
  .body ::v-deep{
    text-indent: 2em;
    line-height: 1.5;
    iframe,img{
      width: 100%;
      height: auto;
    }
    iframe{
      display: block;
    }
  }
  .card ::v-deep{
    line-height: 1.6;
    .card-title{
      margin-left: 0.2778rem;
      padding: 0.75rem 0;
      font-weight: bold;
      color: map-get($colors,"blue");
    }
  }
</style>