import Api from '@/services/Api'

export default {
  GetDatalogValue (data) {
    return Api().post('getDatalogValue', data)
  },
  GetTDDowntime () {
    return Api().get('tdDowntime')
  },
  GetDowntimeD (data) {
    return Api().post('downtime', data)
  }
}
