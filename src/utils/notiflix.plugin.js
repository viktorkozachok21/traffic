import Notiflix from 'notiflix'

export default {
  install(Vue) {
    Vue.prototype.$notiflixSetLoading = () => Notiflix.Loading.Circle('Loading...')
    Vue.prototype.$notiflixRemoveLoading = () => Notiflix.Loading.Remove()
  }
}
