import Api from '@/services/Api'

export default {
  CreateVariable (data) {
    return Api().post('createVariable', data)
  },
  getVariable (data) {
    return Api().post('getVariable', data)
  }
}
