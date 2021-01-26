 const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')


function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}
module.exports = {
    async register (req,res) {
        try {
          const user = await User.create(req.body)
          const userJson = user.toJSON()
          res.send({
             user:  userJson
             })

        } catch (err) {
            res.status(400).send({
                error: 'This Email account already in use.' + err
            })
        }
        
    },
    async login (req,res) {
        try {
            const email = "'"+req.body.email+"'"
            const password = req.body.password
            // var {data} = {}
            User.sequelize.query('SELECT * FROM public."Users" WHERE email = '+email+'',
            { type: User.sequelize.QueryTypes.SELECT}).then(users => {
                if(users.length == 0) {
                    res.status(400).send({
                        error: 'This email is not register'
                    })
                }else {
                const isPasswordValid = users[0].password == password
                if(!isPasswordValid) {
                    res.status(400).send({
                        error: 'Password was incorrect.'
                    })
                } else {
                const userJson = users[0]
                res.send({
                 user: userJson,
                 token: jwtSignUser(userJson)
                })
            }
        }
            })
        } catch (err) {
            res.status(400).send({
                error: 'Opps!! Somting went wrong.Please try after some Time.'
            })
        }
    }
}