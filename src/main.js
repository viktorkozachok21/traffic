import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import notiflixPlugin from '@/utils/notiflix.plugin'
import './registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(notiflixPlugin)

new Vue({
  render: h => h(App),
  vuetify: new Vuetify(),
}).$mount('#app')
