import Vue from 'vue';
import App from './views/App.vue';
import BootstrapVue from 'bootstrap-vue';
import Firebase from 'firebase/app';
import VueTyper from 'vue-typer';
import { firebaseConfig } from '@/firebaseConfig';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'firebase/database';

library.add(faCog)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueTyper);

// Firebaseの初期化
Firebase.initializeApp(firebaseConfig);
export const firebaseDatabase = Firebase.database();

new Vue({
  render: (h) => h(App),
}).$mount('#app');
