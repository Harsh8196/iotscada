import Api from '@/services/Api'

export default {
  Register (user) {
    return Api().post('register', user)
  },
  Login (user) {
    return Api().post('login', user)
  }
}
