import Notiflix from 'notiflix'

export default {
  install(Vue) {
    Vue.prototype.$notiflixSetLoading = () => Notiflix.Loading.Circle('Обробка даних..')
    Vue.prototype.$notiflixRemoveLoading = () => Notiflix.Loading.Remove()
  }
}
