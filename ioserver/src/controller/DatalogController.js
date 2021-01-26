const query = require('../sql_Query/SqlQuery')

module.exports = {
    async ReadDatalogTable (req, res) {
        try {
            await query.q_GetDatalog(req.body.startDate, req.body.endDate, req.body.Company).then(D_Value => {
                res.send(D_Value)
            })
        } catch(err) {
            res.status(400).send({
                error: 'Data Not Found' + err
            })
        }
    },
    async GetTD_Downtime (req, res) {
        try {
            await query.q_GetTD_Downtime().then(DownTime => {
                res.send(DownTime)
            })
        } catch (err) {
            res.status(400).send({
                error: 'Data Not Found' + err
            })
        }
    },
    async GetDowntime (req, res) {
        try {
            await query.q_GetDowntime(req.body.startMonth, req.body.today, req.body.Company).then(DownTime => {
                res.send(DownTime)
            })
        } catch (err) {
            res.status(400).send({
                error: 'Data Not Found' + err
            })
        }
    }
}