const ModbusDataController = require('../controller/ModbusServer')
// const test = require('./mqttsub')
var alarmTrigger = {}

module.exports = (io) => {
    io.of('/data').on('connection', function(socket) {
        setInterval(function () {
          // var mqttdata = test.read()
          // console.log(mqttdata)
          socket.emit('m_data', ModbusDataController.read())
        }, 1000)
        // io.emit('connect', { myData: 'user connected' })
        // socket.emit('Data', ModbusDataController.read())
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