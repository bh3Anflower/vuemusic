import Vue from "vue";
import App from "./App.vue";
import router from "@/router/index.js";
// 导入ElementUI组件库
import ElementUI from "element-ui";
// 导入ElementUI组件库，CSS
import "element-ui/lib/theme-chalk/index.css";
// 导入"axios" 网络请求库
import axios from "axios";

// 把ElementUI安装为插件
Vue.use(ElementUI);

// 将axios 挂载到 vue 的原型对象上
Vue.prototype.$http = axios;

// 设置 请求根目录
// axios.defaults.baseURL = "http://localhost:3000"; // 本地
axios.defaults.baseURL = "https://netease-cloud-music-api-six-jet.vercel.app/"; // 线上

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
