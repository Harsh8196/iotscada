const express = require('express')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const cors = require('cors')
const router = express.Router()
const {sequelize} = require('./models')
const config = require('./config/config')
const data = require('./controller/ModbusServer')
const sql_query = require('./sql_Query/SqlQuery')
// const mqtt = require('mqtt')
const alarm = require('./alarm/alarm')
const alarmformqtt = require('./alarm/mqttalarm')

const app = express()
app.use(morgan('combined'))
app.use(bodyparser.json())
app.use(cors())
app.use(router)

var server = require('http').Server(app);
var io = require('socket.io')(server);
require('./route/route')(io)
require('./route/routerHttps')(router)
// require('./route/mqttpub')(mqtt)
// require('./route/mqttbroker')
require('./route/routeformqtt')(io)
require('./trend/mqttdatalog')
// const test = require('./route/mqttsub')
// test.mqttSub()
sequelize.sync({force: false})
  .then(() => {
    server.listen(config.port);
    console.log(`Server started on port ${config.port}`)
  })


  sql_query.q_ReadIOServer().then(elements => {
    data.readServer(elements)
  })

  sql_query.q_GetLimitFromVar().then(code => {
    data.readLimit(code)
  })

  sql_query.q_GetLimit().then(code => {
    data.readAllLimit(code)
  })
  // sql_query.q_ReadVariable().then(elements => {
  //   data.readVariable(elements)
  // }).then(data.modbusRead())

  sql_query.q_ReadAlarm().then(elements => {
    alarm.readAlarm(elements)
  })

  sql_query.q_ReadAlarm().then(elements => {
    alarmformqtt.readAlarm(elements)
  })

  //require('./trend/Datalog')
  