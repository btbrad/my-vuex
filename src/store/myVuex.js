let Vue = null

class Store {
  constructor (options) {
    this.$options = options
    this._mutations = options.mutations
    this._actions = options.actions
    this._wrappedGetters = options.getters

    // 处理this指向问题
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)

    // 处理getters
    const computed = {}
    this.getters = {}

    const store = this
    Object.keys(this._wrappedGetters).forEach(key => {
      // 获取用户定义的getter
      const fn = store._wrappedGetters[key]
      // 转换为computed可以使用无参数形式
      computed[key] = function () {
        return fn(store.state)
      }

      // 为getters定义只读属性
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key]
      })
    })

    this._vm = new Vue({
      data: {
        $$state: options.state // 两个$数据不会被this劫持代理
      },
      computed
    })
  }

  get state () {
    return this._vm._data.$$state
  }

  set state (val) {
    console.error('Change State directly is not Allowed!')
  }

  commit (type, payload) {
    const entry = this._mutations[type]
    if (entry) {
      entry(this.state, payload)
    } else {
      console.error('no mutation found')
    }
  }

  dispatch (type, payload) {
    const entry = this._actions[type]
    if (entry) {
      entry(this, payload)
    } else {
      console.error('no action found')
    }
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
