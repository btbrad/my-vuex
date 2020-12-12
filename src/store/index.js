import Vue from 'vue'
import Vuex from './myVuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  getters: {
    doubleCounter: state => state.counter * 2
  },
  mutations: {
    add (state, payload) {
      state.counter += payload
    }
  },
  actions: {
    add ({ commit }) {
      commit('add', 1)
    },
    asyncAdd ({ commit }) {
      setTimeout(() => {
        commit('add', 1)
      }, 3000)
    }
  },
  modules: {
  }
})
