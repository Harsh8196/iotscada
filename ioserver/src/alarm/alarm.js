const io = require('socket.io-client')
var Alarm = []
const {AlarmServer} = require('../models')
const Sql_Query = require('../sql_Query/SqlQuery')

const socket = io.connect('http://localhost:8083/data')
    socket.on('connect', () => {
      // console.log(this.socket)
      console.log(" connection establish")
      // console.log(data)
    })
    socket.on('m_data', (data) => {
      // console.log("From alaram")
      // console.log(data)
      const array = data
      const m_Alarm = array.filter((element) => {
        return element.alarm == 1
      })
      // console.log(m_Alarm)
      // console.log(Alarm)
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
async function InsertAlarm (name, activeTime, comments, active,company) {
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
    }
}

