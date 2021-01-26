import Api from '@/services/Api'

export default {
  GetTD_EnergyGen (data) {
    return Api().post('tdEnergyGen', data)
  },
  GetYD_EnergyGen (data) {
    return Api().post('ydEnergyGen', data)
  },
  GetEnergyGen (data) {
    return Api().post('energyGen', data)
  }
}
