const {IOServer} = require('../models')

module.exports = {
    async CreateIOServer (req,res) {
        try {
            const ioServer = await IOServer.create(req.body)
            const ioServerJson = ioServer.toJSON()
            res.send({
                ioServer: ioServerJson
            })            
        } catch(err) {
            res.status(400).send({
                error: 'IO Server was not created.' + err + req.body.Date + req.body.IOServer
            })
        }
    },
    async GetIoServer (req, res) {
        try {
            await IOServer.sequelize.query('Select "IPAddress" from public."IOServers"', {
            type: IOServer.sequelize.QueryTypes.SELECT}).then(ioserver => {
                // const IOServer = ioserver
                res.send(ioserver)
            })
        } catch (err) {
            res.status(400).send({
                error: 'IO Server not found.'
            })
        }
    },
    async GetCompany (req, res) {
        try {
            await IOServer.sequelize.query('Select Company from public."Users"', {
            type: IOServer.sequelize.QueryTypes.SELECT}).then(ioserver => {
                // const IOServer = ioserver
                res.send(ioserver)
            })
        } catch (err) {
            res.status(400).send({
                error: 'Company not found.'
            })
        }
    }
}