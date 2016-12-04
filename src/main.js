import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import QuizView from './views/QuizView';
import HomeView from './views/HomeView';
import StackView from './views/StackView';
import store from './store/store';
import App from './App';

Vue.use(VueRouter);
Vue.use(ElementUI, { locale });

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: HomeView },
    { path: '/quiz', component: QuizView },
    { path: '/stack', component: StackView },
    { path: '*', redirect: '/' }
  ]
});

new Vue(Vue.util.extend({
  store,
  router
}, App)).$mount('div');
