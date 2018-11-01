import moment from 'moment'

export default {
  install(Vue) {

    // date filter
    Vue.filter('date', (secs, format = 'DD.MM.YYYY') => moment.unix(secs).format(format))

  }
}
