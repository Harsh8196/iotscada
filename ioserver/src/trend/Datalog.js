// const io = require('socket.io-client')
const {Datalog} = require('../models')
const M_Data = require('../controller/ModbusServer')
const query = require('../sql_Query/SqlQuery')

    setInterval(() => {
        var t = new Date()
        var dateTime = t.getDate() + '-' + (t.getMonth() + 1) + '-' + t.getFullYear() + ' ' + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds()
        // t.getMinutes()%2 == 0 && 
        if (t.getSeconds() == 1) {
        const Value = M_Data.read()
        const Tags = Value
        console.log(Tags.length)
        if(Tags.length !== 0) {
            console.log('Datalog is generated')
            q_Datalog(dateTime, Tags[6].data, Tags[7].data, Tags[8].data, Tags[9].data, Tags[10].data, Tags[11].data, Tags[12].data, Tags[21].data, Tags[18].data, Tags[19].data,
            Tags[5].data, Tags[17].data, Tags[13].data, Tags[14].data, Tags[15].data, Tags[16].data,Tags[2].Company)

          console.log('Datalog is generated')
        }
        }
        if (t.getHours() == 0 && t.getMinutes() == 5 && t.getSeconds() == 0) {
            q_EnergySp()
            q_AlarmSp()
        }
    }, 1000)



    async function q_Datalog(DateTime, Energy, R_Voltage, Y_Voltage, B_Voltage, RY_Voltage, YB_Voltage, BR_Voltage, RPM, PV_1, PV_2, Freq, PF, R_Power, Y_Power, B_Power, T_Power,company) {
        await Datalog.create({
            Date_Time: DateTime,
            Energy: Energy,
            R_Current:  R_Voltage,
            Y_Current: Y_Voltage,
            B_Current: B_Voltage,
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
    