import Vue from 'vue'
import App from './App.vue'
import router from './router'
import services from './services/index.js'

Vue.config.productionTip = false

// Global login methods
Vue.use({
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$services', {
      value: services
    })
  }
})

// Filters
Vue.filter('currency', (value) => {
  return value.toLocaleString('es-US', { style: 'currency', currency: 'USD' });
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
