const {Alarm} = require('../models')
const {AlarmServer} = require('../models')
const Sql_Query = require('../sql_Query/SqlQuery')
const quots = "'"

module.exports = {
    async CreateAlarm (req, res) {
        try {
            const newAlarm = await Alarm.create(req.body)
            const AlarmJson = newAlarm.toJSON()
            console.log(newAlarm)
            res.send ({
                Alarm: AlarmJson
            })
        } catch (err) {
            res.status(400).send ({
                error: 'Alarm was not created' + err
            })
        }
    },
    async GetAlarm (req, res) {
        try {
            await AlarmServer.sequelize.query('Select "Comments","ActiveTime","DeactiveTime","AckTime","Active" from public."AlarmServers" where "Company" = '+quots+''+ req.body.Company +''+quots+' order by cast("ActiveTime" as Timestamp) desc LIMIT 10', 
            {type: AlarmServer.sequelize.QueryTypes.SELECT}).then(Alarm => {
                    // const IOServer = ioserver
                    console.log(Alarm)
                    res.send(Alarm)
                })
        } catch (err) {
            res.status(400).send({
                error: 'Alarm was not Fetched' + err
            })
        }
    },
    async GetAlarmData (req, res) {
        try {
            await Sql_Query.q_GetAlarm(req.body.startDate, req.body.endDate, req.body.Company).then(D_value => {
                res.send(D_value)
            })
        } catch (err) {
            res.status(400).send({
                error: 'Data Not Found' + err
            })
        }
    }
}