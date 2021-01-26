// const {Datalog} = require('../models')
const sql_query = require('../sql_Query/SqlQuery')

module.exports = {

    async TodayEnergyGen (req, res) {
        try {
            await sql_query.q_GetTD_EnergyGen(req.body.today, req.body.tomorrow, req.body.Company).then(EnergyGen => {
                // const IOServer = ioserver
                console.log(EnergyGen)
                res.send(EnergyGen)
            })
        } catch (err) {
            res.status(400).send({
                error: 'Data Not Available' + err
            })
        }
    },
    async YesterdayEnergyGen (req, res) {
        try {
            await sql_query.q_GetYD_EnergyGen(req.body.yesterday, req.body.today, req.body.Company).then(EnergyGen => {
                res.send(EnergyGen)
            })
        } catch (err) {
            res.status(400).send({
                error: 'Data Not Available' + err
            })
        }
    },
    async EnergyGen (req, res) {
        try {
            await sql_query.q_GetEnergyGen(req.body.startMonth, req.body.today, req.body.Company).then(EnergyGen => {
                res.send(EnergyGen)
            })
        } catch (err) {
            res.status(400).send({
                error: 'Data Not Available' + err
            })
        }
    }
}