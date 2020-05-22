import Vue from 'vue'
import App from './App.vue'
import notiflixPlugin from '@/utils/notiflix.plugin'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(notiflixPlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')
