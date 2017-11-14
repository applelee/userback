<template>
  <div class='register-container'>
    <div class='window'>
      <div class='header'>
        <span>会员注册</span>
      </div>
      <div class='content'>
        <div class='form-box'>
          <el-form :model='ruleForm' status-icon :rules='rules' ref='ruleForm' label-width='100px' class='demo-ruleForm'>
            <el-form-item label='Email' prop='email'>
              <el-input placeholder='请输入邮箱' v-model='ruleForm.email' auto-complete='on'></el-input>
            </el-form-item>
            <el-form-item label='密码' prop='password'>
              <el-input placeholder='请输入密码' type='password' v-model='ruleForm.password' auto-complete='on'></el-input>
            </el-form-item>
            <el-form-item label='Facebook' prop='fbUsername'>
              <el-input placeholder='Facebook地址' v-model.number='ruleForm.fbUsername'></el-input>
            </el-form-item>
            <el-form-item label='昵称' prop='nickname'>
              <el-input placeholder='请输入昵称' v-model.number='ruleForm.nickname'></el-input>
            </el-form-item>
            <el-form-item label='联系方式' prop='contactContent'>
              <el-input placeholder='请输入ID' v-model='ruleForm.contactContent' class='input-with-select'>
                <el-select v-model='ruleForm.contactType' slot='prepend' placeholder='请选择'>
                  <el-option label='Messenger' value='1'></el-option>
                  <el-option label='line' value='2'></el-option>
                  <el-option label='Skype' value='3'></el-option>
                  <el-option label='WeChat' value='4'></el-option>
                  <el-option label='QQ' value='5'></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item label='邀请码' prop='code'>
              <el-input  placeholder='请输入邀请码' v-model.number='ruleForm.invitationCode'></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model='ruleForm.agree'><span>我已仔细阅读並接受</span></el-checkbox><a class='tiaokuan'>联盟会员条款</a>
            </el-form-item>
            <el-form-item>
              <el-button type='primary' @click="submitForm('ruleForm')">点击注册</el-button>
              <el-button @click="resetForm('ruleForm')" type='text'>忘记密码</el-button>
              <router-link to='/login' class='btn-go'>
                <el-button type='text'>立即登录</el-button>
              </router-link>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  data() {
    // const registerInfo = JSON.parse(Vue.prototype.$getLS('registerInfo'));
    return {
      ruleForm: {
        email: '',
        password: '',
        fbUsername: '',
        nickname: '',
        contactType: '2',
        contactContent: '',
        invitationCode: '',
        agree: false,
      },
      rules: {
        email: [
          { type: 'email', required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        password: [
          { type: 'string', required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
        ],
        fbUsername: [
          { required: true, message: '请输入Facebook地址', trigger: 'blur' },
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
        contactContent: [
          { type: 'string', required: true, message: '请输入号码', trigger: 'blur' },
        ],
      },
    };
  },
  mounted() {
    let minH = $(window).height() - 145;
    $('.register-container').css('minHeight', minH);

    $(window).on('resize', () => {
      minH = $(window).height() - 145;
      $('.register-container').css('minHeight', minH);
    });
  },
  methods: {
    ...mapActions('register', [
      'register',
    ]),
    login() {
      this.stateLogin();
      this.$router.push('/release');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }
        this.ruleForm.contactType = parseInt(this.ruleForm.contactType, 10);
        return this.register(this.$stringify(this.ruleForm))
        .then((res) => {
          if (res.status !== 200) {
            this.$message.error('注册失败，请重试！');
            return;
          }
          if (!res.data.r) {
            this.$message.warning(res.data.m);
            return;
          }
          this.$message(`${res.data.m}，即将返回登录页。`);
          setTimeout(() => {
            this.$router.push('/login');
          }, 2000);
        });
      });
    },
  },
};
</script>

<style lang='scss' src='@/scss/pages/login.scss'></style>
