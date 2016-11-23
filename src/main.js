import Vue from 'vue';
import VueRouter from 'vue-router';
import QuizView from './views/QuizView';
import HomeView from './views/HomeView';
import store from './store/store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: HomeView },
    { path: '/quiz', component: QuizView },
    { path: '*', redirect: '/' }
  ]
});

new Vue({
  store,
  router,
  template: `
    <div id="app">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/quiz">Quiz</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('div');
