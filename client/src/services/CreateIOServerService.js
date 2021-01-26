import Api from '@/services/Api'

export default {
  CreateIOServer (data) {
    return Api().post('createIOServer', data)
  },
  getIOServer () {
    return Api().get('getIOServer')
  },
  getCompany () {
    return Api().get('getCompany')
  }
}
