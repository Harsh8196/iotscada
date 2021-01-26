const {IOServer} = require('../models')
const {Alarm} = require('../models')
const {Datalog} = require('../models')
const {Limit} = require('../models')
const {Variable} = require('../models')
module.exports = {
    async q_ReadIOServer() {
        const response = await IOServer.sequelize.query('select "IPAddress" from public."IOServers"',
        {type: IOServer.sequelize.QueryTypes.SELECT})
        return response
    },
    async q_ReadVariable() {
        const response = await IOServer.sequelize.query('select * from public."Variables"',
        {type: IOServer.sequelize.QueryTypes.SELECT})
        return response
    },
    async q_ReadAlarm() {
        const response = await Alarm.sequelize.query('select * from public."Alarms"',
        {type: Alarm.sequelize.QueryTypes.SELECT})
        return response
    },
    async q_UpdateAlarm(status, tagname,company) {
        const quots = "'"
        const response = await Alarm.sequelize.query('Update public."Alarms" Set status = '+ status +' where "TagName" = '+quots+''+ tagname +''+quots+' and "Company" = '+quots+''+ company +''+quots+'',
        {type: Alarm.sequelize.QueryTypes.SELECT})
        return response
    },
    async q_UpdateActiveAlarm(deactivetime, active, tagname,company) {
        const quots = "'"
        const response = await Alarm.sequelize.query('Update public."AlarmServers" Set "DeactiveTime" = '+quots+''+ deactivetime +''+quots+' , "Active" = '+ active +' where "Name" = '+quots+''+ tagname +''+quots+' and "Active" = 1 and "Company" = '+quots+''+ company +''+quots+'',
        {type: Alarm.sequelize.QueryTypes.SELECT})
        return response
    },
    async q_GetDatalog(startDate, EndDate,company) {
        const quots = "'"
        const response = await Datalog.sequelize.query('Select * from public."Datalogs" where date("Date_Time") between date('+quots+''+ startDate +''+quots+') and date('+quots+''+ EndDate +''+quots+') and "Company" = '+quots+''+ company +''+quots+' order by date("Date_Time") desc',
        {type: Datalog.sequelize.QueryTypes.SELECT})
        return response
    },
    async q_GetAlarm(startDate, EndDate, company) {
        const quots = "'"
        const response = await Datalog.sequelize.query('Select "Comments","ActiveTime","DeactiveTime","AckTime","Active" from public."AlarmServers" where date("ActiveTime") between date('+quots+''+ startDate +''+quots+') and date('+quots+''+ EndDate +''+quots+') and "Company" = '+quots+''+ company +''+quots+'',
        {type: Datalog.sequelize.QueryTypes.SELECT})
        return response
    },
    async q_GetTD_EnergyGen(startDate, EndDate,company) {
        const quots = "'"
        const response = await Datalog.sequelize.query('Select max("Energy") - min("Energy") as "KWH" FROM public."Datalogs" WHERE date("Date_Time") between date('+quots+''+ startDate +''+quots+') and date('+quots+''+ EndDate +''+quots+') and "Company" = '+quots+''+ company +''+quots+'',
        {type: Datalog.sequelize.QueryTypes.SELECT})
        return response
    },
    async q_GetYD_EnergyGen(startDate, EndDate,company) {
        const quots = "'"
        const response = await Datalog.sequelize.query('Select max("Energy") - min("Energy") as "KWH" FROM public."Datalogs" WHERE date("Date_Time") between date('+quots+''+ startDate +''+quots+') and date('+quots+''+ EndDate +''+quots+') and "Company" = '+quots+''+ company +''+quots+'',
        {type: Datalog.sequelize.QueryTypes.SELECT})
        return response
    },
    async q_GetTD_Downtime() {
        const response = await Datalog.sequelize.query("exec [SCADA].[dbo].[Alarm_24Hr]",
        {type: Datalog.sequelize.QueryTypes.SELECT})
        return response
    },
    async q_GetEnergyGen(startDate, EndDate,company) {
        const quots = "'"
        const response = await Datalog.sequelize.query('SELEct * FROM public."EnergyGen_24hr" WHERE (date("Date")  between  date('+quots+''+startDate+''+quots+') AND  date('+quots+''+EndDate+''+quots+')) and "Company" = '+quots+''+ company +''+quots+'',
        {type: Datalog.sequelize.QueryTypes.SELECT})
        return response
    },
    async q_GetDowntime(startDate, EndDate,company) {
        const quots = "'"
        const response = await Datalog.sequelize.query('Select * FROM public."Alarm_24Hr_TB" WHERE (date("Date")  between  date('+quots+''+startDate+''+quots+') AND  date('+quots+''+EndDate+''+quots+')) and "Company" = '+quots+''+ company +''+quots+'',
        {type: Datalog.sequelize.QueryTypes.SELECT})
        return response
    },
    async q_GetLimit() {
        const response = await Limit.sequelize.query('Select * FROM public."Limits"',
        {type: Limit.sequelize.QueryTypes.SELECT})
        return response
    },
    async q_GetLimitFromVar() {
        const response = await Variable.sequelize.query('Select distinct "code" from public."Variables"',
        {type: Variable.sequelize.QueryTypes.SELECT})
        return response
    },
    async sp_Energy24Hr() {
        const response = await Datalog.sequelize.query("Exec Energy_24Hr",{type: Datalog.sequelize.QueryTypes.SELECT})
        return response
    },
    async sp_Alarm24Hr() {
        const response = await Alarm.sequelize.query("Exec Alarm_24Hr",{type: Alarm.sequelize.QueryTypes.SELECT})
        return response
    }
}