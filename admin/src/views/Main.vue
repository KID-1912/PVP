<template>
  <el-container style="height: 100%;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu 
      :default-active="$route.path"
      unique-opened router>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>内容管理</template>
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">视频</template>
            <el-menu-item index="/videos/create">新建视频</el-menu-item>
            <el-menu-item index="/videos/list">视频列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heros/create">新建英雄</el-menu-item>
            <el-menu-item index="/heros/list">英雄列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categorys/create">新建分类</el-menu-item>
            <el-menu-item index="/categorys/list">分类列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-message"></i>运营管理</template>
          <el-menu-item-group>
            <template slot="title">广告栏</template>
            <el-menu-item index="/ads/create">新建广告</el-menu-item>
            <el-menu-item index="/ads/list">广告栏列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-message"></i>系统设置</template>
          <el-menu-item-group>
            <template slot="title"></template>
            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
       <keep-alive><router-view></router-view></keep-alive>
    </el-main>
    </el-container>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      return {
      }
    }
  };
</script>
