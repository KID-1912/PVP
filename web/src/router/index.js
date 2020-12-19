import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
// 阻止路由自跳转报错
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const Main = () =>  import('views/main.vue')
const Home = () => import('views/Home/home.vue')
const Article = () => import('views/Article/article.vue')
const Hero = () => import('views/Hero/hero.vue')

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {path: '/',component: Home},
      {path: '/raiders'},
      {path: '/match'},
      {path: '/article/:id',component: Article,props: true}
    ]
  },
  {path: '/hero/:id',component: Hero,props: true}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
