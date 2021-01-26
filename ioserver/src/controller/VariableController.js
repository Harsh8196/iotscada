const {Variable} = require('../models')
const sqlQuery = require('../sql_Query/SqlQuery')
var limit = []
var code = 0



module.exports = {
    async CreateVariable (req, res) {
        try {
                limit = await sqlQuery.q_GetLimit()
                const address = req.body.Address
                limit.forEach(element => {
                    if(address >= element.min && address <= element.max) {
                        code = element.code
                    } else {
                        console.log('Not Match Limit:_Min--' + element.min + '_Max--' + element.max + '_Code--' + element.code)
                    }
                })
            req.body.code = code
            const newVariable = await Variable.create(req.body)
            const variableJson = newVariable.toJSON()
            console.log(newVariable)
            res.send ({
                Variable: variableJson
            })
        } catch (err) {
            res.status(400).send ({
                error: 'Variable was not created' + err
            })
        }
    },
    async GetVariable (req, res) {
        try {
            const name  = "'"
            console.log(name)
            await Variable.sequelize.query('Select "Name" from public."Variables" where "DataSource" ='+ name +''+ req.body.name +''+ name +' and alarm = 1 ', {
                type: Variable.sequelize.QueryTypes.SELECT}).then(Variable => {
                    // const IOServer = ioserver
                    res.send(Variable)
                })
        } catch (err) {
            res.status(400).send ({
                error: 'Variable was not Found' + err
            })
        }
    }
}