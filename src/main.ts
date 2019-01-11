import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import Firebase from 'firebase/app';
import { firebaseConfig } from '@/firebaseConfig';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'firebase/database';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

// Firebaseの初期化
Firebase.initializeApp(firebaseConfig);
export const firebaseDatabase = Firebase.database();

new Vue({
  render: (h) => h(App),
}).$mount('#app');
