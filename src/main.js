import { Vue, h } from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: () => { h(App) }
}).$mount('#app')
