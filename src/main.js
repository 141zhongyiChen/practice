// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

/* Add Myself */
import Layout from './components/layout.vue'
/* Add Myself */
import router from './router'

import VueResource from 'vue-resource'
Vue.use(VueResource) ;

/* Add Myself */
import $ from 'jquery'
/* Add Myself */

Vue.config.productionTip = false ;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Layout },
  template: '<Layout/>'
});
