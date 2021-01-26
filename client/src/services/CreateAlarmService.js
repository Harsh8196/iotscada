import Api from '@/services/Api'

export default {
  CreateAlarm (data) {
    return Api().post('createAlarm', data)
  },
  GetAlarm (data) {
    return Api().post('getAlarm', data)
  },
  GetAlarmData (data) {
    return Api().post('getAlarmdata', data)
  }
}
