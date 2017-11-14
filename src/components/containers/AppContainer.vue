<template>
  <div class="app-container">
    <div class='top'>
      <div class='header'>
        <div class='center'>
          <div class='logo'><span>Summer</span></div>
          <div class='nav-box'>
            <div class='nav-item'><i class='el-icon-notice'></i><span class='notice-num'>6</span></div>
            <div class='nav-item'><i class='el-icon-user'></i><i class='arrow-down'></i></div>
          </div>
        </div>
      </div>
      <div class='border' v-show='!isLogin'></div>
      <div class='nav' v-show='isLogin'>
        <div class='center'>
          <a class='current'>收入报表</a>
          <a>点开报表</a>
          <a>文章推荐</a>
          <a>发布新文章</a>
          <a>发文管理</a>
          <a>账单报表</a>
          <a>下线管理</a>
          <a>会员信息</a>
          <a>通知</a>
        </div>
      </div>
      <div class='bread-crumb' v-show='isLogin'>
        <div class='center'>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </div>

    <slot></slot>

    <div class='footer'>
      <div class='center'>
        <p>©2017 Oceans. All Rights Reserved. 联系我们  隐私条款</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AppContainer',
  data() {
    return {
    };
  },
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      isLogin: state => state.isLogin,
    }),
  },
  mounted() {
  },
};
</script>

<style scoped lang='scss' src='@/scss/public/hf.scss' />
