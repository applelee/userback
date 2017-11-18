<template>
  <div class='release-container'>
    <div class='center'>
      <div class='content'>
        <el-form ref='form' :model='form' label-position='left' label-width='60px' :rules='rules'>
          <el-form-item label='语言'>
            <el-select v-model='form.lang' size='large'>
              <el-option label='繁体中文' value='zh_tw'></el-option>
            </el-select>
            <el-checkbox :model='form.authorization'> 授权公开（授权公开后，审核通过的文章会被其它编辑查看，并可为您推广或翻译为其它语种，同时你可以获取相应的收入。）</el-checkbox>
          </el-form-item>

          <el-form-item label='标题' class='content-right'
            prop='title'>
            <el-input v-model='form.title' placeholder='请输入标题' size='large' auto-complete='off'></el-input>
            <span class='testing'>检测</span>
          </el-form-item>

          <div class='custom-box'>
            <div class='custom-left'><span class='title'>文章来源</span></div>
            <div class='custom-right'>
              <p>源文地址（如果您发布的内容并非原创，为避免版权纠纷，请您将原文所在网址输入到文本框内，以下网站的文章禁止转载   点击查看）</p>
            </div>
          </div>

          <div class='custom-box custom-box-1'>
            <div class='custom-left'>
              <el-radio-group v-model='form.atype' @change='changeAtype'>
                <el-radio text-color='#1f2d3d' :label='1'>原创</el-radio>
                <el-radio text-color='#1f2d3d' :label='2'>转载</el-radio>
              </el-radio-group>
            </div>
            <div class='custom-right'>
              <el-input :disabled='form.atype === 1' v-model='form.sourceUrl' size='large' placeholder='请输入来源地址'></el-input>
            </div>
          </div>

          <div class='custom-box custom-box-2'>
            <div class='custom'>
              <el-row>
                <el-col :span='8'>
                  <span class='title'>一级分类</span>
                  <el-select v-model="form.firstCateid" placeholder='请选择' @change='selFirstCategoryId'>
                    <el-option v-for='item in fCategories' :key='item.key' :label='item.value' :value='item.key'></el-option>
                  </el-select>
                </el-col>
                <el-col :span='8'>
                  <span class='title'>二级分类</span>
                  <el-select v-model="form.cateid" placeholder='请选择' @change='selCategoryId'>
                    <el-option v-for='item in sCategories[form.firstCateid]' :key='item.key' :label='item.value' :value='item.key'></el-option>
                  </el-select>
                </el-col>
                <el-col :span='8'>
                  <span class='title'>关键词</span>
                  <el-input class='tags' v-model='form.tags' placeholder='请输入关键词' size='large' auto-complete='off'></el-input>
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class='remind-box'>
            <p>请根据您的文章内容谨慎选择分类。恶意选择错误的文章分类将扣除您违规文章已产生点阅的40%。</p>
          </div>

          <div class='upload-box'>
            <div class='upload'>
              <div class='content'>
                <el-upload
                  class='cover-uploader'
                  :action='baseURL'
                  :show-file-list='false'
                  :on-success='coverSuccess'
                  :on-error='coverError'>
                  <img v-if='form.cover' :src='form.cover' cover='avatar'>
                  <i v-else class='el-icon-plus cover-uploader-icon'></i>
                </el-upload>
                <div class='cover-info'>
                  <p> 建议大小：800*450 px,选择合适比例的图片才能获得更好的效果 </p>
                  <p>仅支持jpg，jpeg，png，gif图片<br/>
  小贴士：封面图片不要与内容插图一致</p>
                </div>
              </div>
            </div>
            <div class='nickname-box'>
              <div class='content'>
                <div class='nickname'><em>*</em><span>作者（昵称）</span></div>
                <el-form-item class='auth'
                  prop='nickname'>
                  <el-input v-model='form.nickname' placeholder='请输入作者名或昵称' size='large' auto-complete='off'></el-input>
                </el-form-item>
              </div>
            </div>
          </div>

          <div class='editor'>
            <textarea id='editor'></textarea>
          </div>

          <div class='btn-box'>
            <div class='right'>
              <el-button class='green' type='warning' @click="submitForm('form',1)">直接发布</el-button>
              <el-button class='green' type='success' @click="submitForm('form',2)">存为草稿</el-button>
              <el-button class='green' type='success' @click="submitForm('form',3)">草稿并预览</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import conf from '@/config';

export default {
  name: 'Release',
  data() {
    return {
      baseURL: `${conf.baseURL}/upload-images`,
      form: {
        userId: this.$getLS('accessToken'),
        lang: 'zh_tw',
        title: '',
        atype: 1,
        sourceUrl: '',
        firstCateid: '',
        cateid: '',
        tags: '',
        cover: '',
        nickname: '',
        content: '',
        type: 1,
      },
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' },
        ],
        nickname: [
          { required: true, message: '请输入作者名或昵称', trigger: 'blur' },
        ],
      },
      h: 'Text to bind',
      content: '<h1>Default content</h1>',
      options: {},
    };
  },
  mounted() {
    // 获取集联数据
    this.categories();

    tinymce.init({
      selector: 'textarea',
    });
  },
  computed: {
    ...mapState('release', [
      'fCategories',
      'sCategories',
    ]),
  },
  methods: {
    changed() {},
    ...mapActions('release', [
      'categories',
      'storage',
    ]),
    handleAvatarSuccess() {},
    beforeAvatarUpload() {},
    changeAtype(v) {
      if (v === 1) {
        this.form.sourceUrl = '';
      }
    },
    selFirstCategoryId(v) {
      this.form.firstCateid = v;
    },
    selCategoryId(v) {
      this.form.cateid = v;
    },
    coverSuccess(result) {
      this.form.cover = result;
      this.$message('图片上传成功');
    },
    coverError() {
      this.$message.error('图片上传失败');
    },
    submitForm(form, type = 1) {
      this.$refs[form].validate((valid) => {
        if (!valid) {
          this.$message.error('请完善发布信息');
          return false;
        }
        return this.storage(this.$stringify({
          ...this.form,
          submitType: type,
        }))
        .then((res) => {
          console.log(res);
        });
      });
    },
  },
};
</script>

<style lang='scss' src='@/scss/pages/release.scss'></style>
