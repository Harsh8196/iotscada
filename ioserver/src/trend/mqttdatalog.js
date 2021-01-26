// const io = require('socket.io-client')
const {Datalog} = require('../models')
// const M_Data = require('../controller/ModbusServer')
const query = require('../sql_Query/SqlQuery')
var mqttData = []
var mqtttopic = ''
var options = {
    port: 1883,
    username: 'admin',
    password: 'a8dmin@h8arsh',
    clean: true
  }
const mqtt = require('mqtt')

    const client = mqtt.connect('mqtt://localhost',options)
    client.on('connect', () => {
    // Inform controllers that garage is connected
    client.subscribe('AakashFashion',{qos:1})
    client.subscribe('OmkarFashion',{qos:1})
    console.log("Connect to Mqtt server")
    })

    client.on('message', function (topic, message) {
        const Result = message.toString()
        mqttData = JSON.parse(Result)
        mqtttopic = topic

    })
    // setInterval(() => {
        // client.subscribe('AakashFashion',{qos:0})
        // client.subscribe('OmkarFashion',{qos:0})
        

    setInterval(() => {
        
        var t = new Date()
        var dateTime = t.getDate() + '-' + (t.getMonth() + 1) + '-' + t.getFullYear() + ' ' + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds()
        // t.getMinutes()%2 == 0 && 
        if (t.getSeconds() == 1) {
        console.log('Inside Datalog'+mqtttopic)
        const Value = mqttData
        const Tags = Value
        console.log(Tags.length)
        if(Tags.length !== 0) {
            console.log('Datalog is generated')
            console.log(mqttData)
            q_Datalog(dateTime, Tags[20].data, Tags[0].data, Tags[1].data, Tags[2].data, Tags[3].data, Tags[4].data, Tags[5].data, Tags[7].data, Tags[11].data, Tags[12].data,
            Tags[19].data, Tags[6].data, Tags[21].data, Tags[22].data, Tags[23].data, Tags[24].data,Tags[1].Company)

          console.log('Datalog is generated')
        }
        }
        if (t.getHours() == 0 && t.getMinutes() == 5 && t.getSeconds() == 0) {
            q_EnergySp()
            q_AlarmSp()
        }
    }, 1000)



    async function q_Datalog(DateTime, Energy, R_current, Y_current, B_current, RY_Voltage, YB_Voltage, BR_Voltage, RPM, PV_1, PV_2, Freq, PF, R_Power, Y_Power, B_Power, T_Power,company) {
        await Datalog.create({
            Date_Time: DateTime,
            Energy: Energy,
            R_Current:  R_current,
            Y_Current: Y_current,
            B_Current: B_current,
            RY_Voltage: RY_Voltage,
            YB_Voltage: YB_Voltage,
            BR_Voltage: BR_Voltage,
            RPM: RPM,
            Back_Pressure: PV_1,
            Inlet_Pressure: PV_2,
            Freq: Freq,
            PF: PF,
            R_Power: R_Power,
            Y_Power: Y_Power,
            B_Power: B_Power,
            T_Power: T_Power,
            Company: company
        })
    }

    async function q_EnergySp() {
       const response =  await query.sp_Energy24Hr()
       console.log(response)
    }
    async function q_AlarmSp() {
        const response =  await query.sp_Alarm24Hr()
        console.log(response)
     }
    