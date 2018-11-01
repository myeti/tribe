import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './plugins/api'
import filters from './plugins/filters'
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(api)
Vue.use(filters)

Vue.api.session().then(ready => {
  new Vue({
    router, store,
    render: h => h(App),
  }).$mount('#app')
})
