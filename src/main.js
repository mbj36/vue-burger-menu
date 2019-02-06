import Vue from 'vue'
import App from './App.vue'
import App2 from './App2.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App2)
}).$mount('#app')
