import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  mutations: {
    setToken (state, token) {
      // localStorage.setItem('token', token)
      state.token = localStorage.getItem('token')
      if (token) {
        state.isUserLoggedIn = true
        localStorage.setItem('isuserlogedin', true)
      } else {
        state.isUserLoggedIn = false
        localStorage.setItem('isuserlogedin', false)
      }
    },
    setUser (state, user) {
      // localStorage.setItem('user', user.email)
      state.user = localStorage.getItem('user')
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    }
  }
})
