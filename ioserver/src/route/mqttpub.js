// var clientopt = {
//     ClientId : 'clientId-qttnNbASDj'
// }
const ModbusDataController = require('../controller/ModbusServer')
const pubData = [{
  tag: '',
  data: null,
  client: ''
}]
module.exports = (mqtt) => {
  const client = mqtt.connect('mqtt://broker.hivemq.com')
  var state = 'closed'
  client.on('connect', () => {
  // Inform controllers that garage is connected
      client.publish('garage/connected', 'true')
  })
  setInterval(() => {
    var data = ModbusDataController.read()
    const ReqData = data.filter((data) => {
      return data.DataSource === '127.0.0.1'
    })
    pubData.splice(0,pubData.length)
    console.log(pubData)
    ReqData.forEach((data) => {
     pubData.push({tag: data.Name, data: data.data, client: data.DataSource})
    })

    var VarData = {}
    VarData = pubData
    client.publish('garage/status', JSON.stringify(VarData))
  }, 2000)
  console.log(state)
}
