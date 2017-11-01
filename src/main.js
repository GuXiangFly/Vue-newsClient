import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router.config'
import stores from './store/'
import axios from 'axios'
import Loading from './components/Loading'

import filters from './filters'


// vue1.0的写法 Vue.filter(名字，函数)
// 循环遍历所有的 过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

Vue.use(VueRouter);
Vue.use(Loading);

Vue.prototype.$http = axios;

const router=new VueRouter({
    mode: 'history', //切换路径模式，变成history模式
    scrollBehavior: () => ({ y: 0 }), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
    routes
});

//
axios.interceptors.request.use(function (config) {  //配置发送请求的信息
    stores.dispatch('showLoading')
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) { //配置请求回来的信息
    stores.dispatch('hideLoading')
    return response;
}, function (error) {

    return Promise.reject(error);
});


//Vue.use(Loading);

require('./assets/css/base.css'); //引入全局的base文件

new Vue({
    router,
    el: '#app',
    stores,
    render: h => h(App)
});