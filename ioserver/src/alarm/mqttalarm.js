const io = require('socket.io-client')
var Alarm = []
const {AlarmServer} = require('../models')
const Sql_Query = require('../sql_Query/SqlQuery')
// const mqtt= require('./mqttsub')
var mqttData = []
var options = {
  port: 1883,
  username: 'admin',
  password: 'a8dmin@h8arsh',
  clean: true
}
const mqtt = require('mqtt')

const socket = io.connect('http://localhost:8083/data')
    socket.on('connect', () => {
      // console.log(this.socket)
      console.log(" connection establish")
      // console.log(data)
    })
    const client = mqtt.connect('mqtt://localhost',options)
    // var state = 'closed'
    client.on('connect', () => {
    // Inform controllers that garage is connected
    client.subscribe('AakashFashion',{qos:1})
    client.subscribe('OmkarFashion',{qos:1})
    // console.log("Connect to Mqtt server")
    })
    client.on('message', function (topic, message) {
        const Result = message.toString()
        mqttData = JSON.parse(Result);
        console.log('From Alarm:---'+topic)
        // console.log(topic)
        // if (message.toString().indexOf("510") == 0) {
        //     console.log("Simulating device restart...");
        //     client.publish("s/us", "501,c8y_Restart");
        //     console.log("...restarting...");
        //     setTimeout(function() {
        //         client.publish("s/us", "503,c8y_Restart");
        //     }, 1000);
        //     console.log("...done...");
        // }
    
    // client.unsubscribe('AakashFashion',{qos:0})
    // client.unsubscribe('OmkarFashion',{qos:0})
    // console.log("Subscribing Topic")
// },2000)
    // console.log(state)
    
      // console.log("From alaram")
      // console.log(data)
      const array = mqttData
      const m_Alarm = array.filter((element) => {
        return element.alarm == 1
      })
    //   console.log(m_Alarm)
    //   console.log(Alarm)
      Alarm.forEach((element) => {
          m_Alarm.forEach((el) => {
              if(element.TagName == el.Name) {
                  if(el.data == element.Condition && (element.status == 0 || element.status == null)) {
                    const t = new Date()
                    console.log(t)
                    var activeTime = t.getDate() + '-' + (t.getMonth() + 1) + '-' + t.getFullYear() + ' ' + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds()
                    console.log(activeTime)
                      console.log('Alarm is Generated for: ' + element.TagName + '-----' + el.data + element.status)
                      InsertAlarm(element.TagName, activeTime, element.Comments, 1,el.Company)
                      Sql_Query.q_UpdateAlarm(1, element.TagName,el.Company).then(Sql_Query.q_ReadAlarm).then(element => {
                          Alarm = element
                      })
                      socket.emit('AlarmGenerated', {trigger: 1})
                      element.status = 1
                  }
                  if(el.data != element.Condition && element.status == 1 && el.data != null) {
                    const dt = new Date() 
                    var deactiveTime = dt.getDate() + '-' + (dt.getMonth() + 1) + '-' + dt.getFullYear() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
                    console.log(deactiveTime)
                    console.log('Alarm is Clear for: ' + element.TagName + '-----' + el.data + element.status)
                    Sql_Query.q_UpdateActiveAlarm(deactiveTime, 0, element.TagName,el.Company).then(
                    Sql_Query.q_UpdateAlarm(0, element.TagName,el.Company).then(Sql_Query.q_ReadAlarm).then(element => {
                          Alarm = element
                      }))
                      socket.emit('AlarmCleared', {trigger: 1})
                }
              }
          })
      })
    })
async function InsertAlarm (name, activeTime, comments, active, company) {
    await AlarmServer.create({
        Name: name,
        Comments: comments,
        ActiveTime: activeTime,
        DeactiveTime: '',
        AckTime: '',
        Active: active,
        Ack: '',
        Company: company
    })
}
module.exports = {
    readAlarm (alarm) {
        Alarm = alarm
        // console.log(Alarm)
    }
}

