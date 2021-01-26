// const ModbusDataController = require('../controller/ModbusServer')
// const test = require('./mqttsub')
var alarmTrigger = {}
var mqttData = []
var options = {
  port: 1883,
  username: 'admin',
  password: 'a8dmin@h8arsh',
  clean: true
}
const mqtt = require('mqtt')

module.exports = (io) => {
    io.of('/data').on('connection', function(socket) {
        // setInterval(function () {
        //   var mqttdata = test.read()
        //   // console.log(mqttdata)
        //   socket.emit('m_data', mqttdata)
        // }, 1000)
        // io.emit('connect', { myData: 'user connected' })
        // socket.emit('Data', ModbusDataController.read())
        const client = mqtt.connect('mqtt://104.248.49.155',options)
        client.on('connect', () => {
        // Inform controllers that garage is connected
        client.subscribe('AakashFashion',{qos:1})
        client.subscribe('OmkarFashion',{qos:1})
        client.subscribe('AakashFashionPLC',{qos:1})
        console.log("Connect to Mqtt server")
        })
        client.on('message', function (topic, message/*, packet*/) {
          const Result = message.toString()
          console.log(topic)
          // console.log(packet/*.messageId + packet.cmd + '------'+packet.dup*/)
          mqttData = JSON.parse(Result);
          if (topic == 'AakashFashion') {
            // console.log(mqttData)
            // console.log('mqttroute:--'+topic)
            // console.log('1')
            socket.emit('AakashFeb_data', mqttData)
            // console.log(topic)
          }
          if (topic == 'OmkarFashion') {
            // console.log('mqttroute'+topic)
            socket.emit('OmkarFeb_data', mqttData)
          }
          if (topic == 'AakashFashionPLC') {
            if (mqttData[0].status == 'Disconnect') {
              socket.emit('AakashFashion_Status', 'PLC Disconected')
              // console.log('Ipaddress:-- '+mqttData[0].Ipaddress+'--PLC Disconnected')
            }
            if (mqttData[0].status == 'Connect') {
              socket.emit('AakashFashion_Status', 'PLC Conected')
              // console.log('Ipaddress:-- '+mqttData[0].Ipaddress+'--PLC Connected')
            }
            // console.log(mqttData)
          }
      });
        socket.on('AlarmGenerated', (data) => {
          // console.log(data)
          alarmTrigger = data
        })
        setInterval(() => {
          if(alarmTrigger.trigger == 1) {
            socket.emit('AlarmClient', {type: alarmTrigger.trigger})
            console.log(alarmTrigger)
            socket.on('AlarmRecive', (data) => {
              alarmTrigger.trigger = 0
              console.log(data)
            })
          }
        }, 1000)
        socket.on('AlarmCleared', (data) => {
          // console.log(data)
          alarmTrigger = data
        })
    })
    io
  .of('/chat')
  .on('connection', function (socket) {
      setInterval(() => {
        socket.emit('test', { that: 'User Connected',this:'vgjdvkj' });
      }, 20000);
    // chat.emit('a message', {
    //     everyone: 'in'
    //   , '/chat': 'will get'
    // })
  })
    console.log('testing')
    io.of('/news')
  .on('connection', function (socket) {
    socket.emit('item', { news: 'item' })
  })
}