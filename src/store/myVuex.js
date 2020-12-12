let Vue = null

class Store {
  constructor (options) {
    this.$options = options

    this._vm = new Vue({
      data: {
        $$state: options.state // 两个$数据不会被this劫持代理
      }
    })
  }

  get () {
    return this._vm.data.$$state
  }

  set (val) {
    console.error('Change State directly is not Allowed!')
  }
}

function install (_vue) {
  Vue = _vue

  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default {
  Store,
  install
}
