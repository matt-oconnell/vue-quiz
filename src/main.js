import Vue from 'vue';
import store from './store/store';
import App from './App';

/* eslint-disable no-new */
new Vue({
  store, // inject store to all children
  el: 'div',
  template: '<App/>',
  components: { App },
});
