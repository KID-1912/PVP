import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// 一级路由
const Main = () => import('views/Main.vue');
const Login = () => import('views/Login.vue');
  // 二级路由
  const CategoryCreate = () => import('views/Categorys/CategoryEdit.vue');
  const CategoryList = () => import('views/Categorys/CategoryList.vue');
  
  const ItemCreate = () => import('views/Items/ItemEdit.vue');
  const ItemList = () => import('views/Items/ItemList.vue');
  
  const HeroCreate = () => import('views/Heros/HeroEdit.vue');
  const HeroList = () => import('views/Heros/HeroList.vue');
  
  const ArticleCreate = () => import('views/Articles/ArticleEdit.vue');
  const ArticleList = () => import('views/Articles/ArticleList.vue');
  
  const AdCreate = () => import('views/Ads/AdEdit.vue');
  const AdList = () => import('views/Ads/AdList.vue');

  const AdminUserCreate = () => import('views/AdminUsers/AdminUserEdit.vue');
  const AdminUserList = () => import('views/AdminUsers/AdminUserList.vue');

const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      meta: {isPublic: true}
    },
    {
      path: '/',
      redirect: '/articles/list',
      component: Main,
      children: [
        {path: '/categorys/create',component: CategoryCreate},
        {path: '/categorys/list',component: CategoryList},
        {path: '/categorys/edit/:id',component: CategoryCreate,props: true},
        {path: '/items/create',component: ItemCreate},
        {path: '/items/list',component: ItemList},
        {path: '/items/edit/:id',component: ItemCreate,props: true},
        {path: '/heros/create',component: HeroCreate},
        {path: '/heros/list',component: HeroList},
        {path: '/heros/edit/:id',component: HeroCreate,props: true},
        {path: '/articles/create',component: ArticleCreate},
        {path: '/articles/list',component: ArticleList},
        {path: '/articles/edit/:id',component: ArticleCreate,props: true},
        {path: '/ads/create',component: AdCreate},
        {path: '/ads/list',component: AdList},
        {path: '/ads/edit/:id',component: AdCreate,props: true},
        {path: '/admin_users/create',component: AdminUserCreate},
        {path: '/admin_users/list',component: AdminUserList},
        {path: '/admin_users/edit/:id',component: AdminUserCreate,props: true}
      ]
    }
  ],
  mode: 'history'
})

router.beforeEach((to,from,next) => {
  if(!to.meta.isPublic && !sessionStorage.getItem('token')) 
    return next('/login');
  next();
})

export default router


