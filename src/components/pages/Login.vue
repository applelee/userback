<template>
  <div class='login-container'>
    <div class='window'>
      <div class='header'>
        <span>会员登入</span>
      </div>
      <div class='content'>
        <div class='form-box'>
          <div class='form-item'>
            <el-input v-model='username' size='large' placeholder='请输入用户名'></el-input>
            <i class='icon-name'></i>
          </div>
          <div class='form-item'>
            <el-input v-model='password' size='large' placeholder='请输入密码' type='password'></el-input>
            <i class='icon-password'></i>
          </div>
          <div class='form-item'>
            <el-checkbox v-model='remember' @change='rememberChange'>记住密码</el-checkbox>
          </div>
          <div class='form-item'>
            <span class='login-bottom' @click='clickLogin'>登录</span>
          </div>
          <div class='form-item'>
            <router-link to='/login'>忘记密码？</router-link>
            <router-link to='/register'>立即注册</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      username: this.$getLS('username'),
      password: this.$getLS('password'),
      remember: this.$getLS('remember'),
    };
  },
  mounted() {
    let minH = $(window).height() - 145;
    $('.login-container').css('minHeight', minH);

    $(window).on('resize', () => {
      minH = $(window).height() - 145;
      $('.login-container').css('minHeight', minH);
    });

    this.stateLogout();
  },
  methods: {
    ...mapMutations([
      'stateLogin',
      'stateLogout',
    ]),
    ...mapActions('login', [
      'login',
    ]),
    clickLogin() {
      if (!this.username) {
        this.$message.error('请输入用户名');
        return;
      } else if (!this.password) {
        this.$message.error('请输入密码');
        return;
      }

      this.login(this.$stringify({
        username: this.username,
        password: this.$md5(this.password),
      }))
      .then((res) => {
        if (res.status !== 200) {
          this.$message.error('登陆失败，请重试！');
          return;
        }
        if (res.data.msg === 'user_not_found') {
          this.$message.error('用户没找到、请输入正确用户名！');
          return;
        } else if (res.data.msg === 'error_password') {
          this.$message.error('用户密码错误！');
          return;
        }
        if (this.remember) {
          this.$saveLS('username', this.username);
          this.$saveLS('password', this.password);
        } else {
          this.$saveLS('username', '');
          this.$saveLS('password', '');
        }
        this.$saveLS('accessToken', res.data.accessToken);
        this.stateLogin();
        this.$router.push('/release');
      });
    },
    rememberChange(v) {
      this.$saveLS('remember', v);
    },
  },
};
</script>

<style lang='scss' src='@/scss/pages/login.scss'></style>
