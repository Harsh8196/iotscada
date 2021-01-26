import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import VueFusionCharts from 'vue-fusioncharts'
import FusionCharts from 'fusioncharts'
import HorizontalLED from 'fusioncharts/fusioncharts.widgets'
import FusionChartsDT from 'fusioncharts/fusioncharts.charts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
import FusionThemeCandy from 'fusioncharts/themes/fusioncharts.theme.candy'
Vue.use(VueFusionCharts, FusionCharts, HorizontalLED, FusionTheme, FusionThemeCandy, FusionChartsDT)
Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(require('moment'))
sync(store, router)

const opts = {
  theme: {
    dark: false,
    themes: {
      light: {
        primary: 'black'
      },
      dark: {
        primary: 'White'
      }
    }
  }
}

new Vue({
  router,
  store,
  vuetify: new Vuetify(opts),
  render: h => h(App)
}).$mount('#app')
