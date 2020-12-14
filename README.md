# my-vuex

> 手写vuex

### 1. 创建一个Store类，实现一个install方法
```js
let Vue = null

class Store {
  constructor(options) {
    this.$options = options
  }
}

function install(_vue) {
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
```

### 2. 实现响应式的state
```js
class Store {
  constructor(options) {
    this.$options = options

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
}
```

### 3. 实现commit和dispatch
```js
class Store {
  constructor(options) {
    this.$options = options

    this._mutations = options.mutations
    this._actions = options.actions
  }

  // 处理this指向问题
  this.commit = this.commit.bind(this)
  this.dispatch = this.dispatch.bind(this)

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
```

### 4. 实现getters
```js
class Store {
  constructor(options) {
    this.$options = options

    this._wrappedGetters = options.getters

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
}
```
