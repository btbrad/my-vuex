let Vue = null

class Store {
  constructor (options) {
    this.$options = options
    this._mutations = options.mutations
    this._actions = options.actions

    this._vm = new Vue({
      data: {
        $$state: options.state // 两个$数据不会被this劫持代理
      }
    })
  }

  get state () {
    return this._vm._data.$$state
  }

  set state (val) {
    console.error('Change State directly is not Allowed!')
  }

  commit (type, payload) {
    this._mutations[type](payload)
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
