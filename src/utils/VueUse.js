import Vue from 'vue';
import { Row, Col, Button, Select, Option, Form, FormItem, Input, Checkbox, CheckboxGroup, BreadcrumbItem, Breadcrumb, Radio, RadioGroup, Upload, Message } from 'element-ui';
import md5 from 'md5';
import { stringify } from 'querystring';

import http from '@/utils/http';
import ls from '@/utils/localStorage';

// element-ui 按需加载
Vue.use(Row);
Vue.use(Col);
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Upload);

// 本地localStorage储存
Vue.use(ls);

// 这样可以在组件方法里 通过this.xxx 来调用
Vue.prototype.$http = http;
Vue.prototype.$md5 = md5;
Vue.prototype.$stringify = stringify;
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
// Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

export default Vue;
