module.exports = (sequelize, DataTypes) => {
    const AlarmServer = sequelize.define('AlarmServer', {
        Name: {
            type: DataTypes.STRING,
        },
        Comments: {
            type: DataTypes.STRING,
        },
        ActiveTime: {
            type: DataTypes.STRING
        },
        DeactiveTime: {
            type: DataTypes.STRING
        },
        AckTime: {
            type: DataTypes.STRING
        },
        Active: {
            type: DataTypes.INTEGER
        },
        Ack: {
            type: DataTypes.STRING 
        },
        Company: {
            type: DataTypes.STRING 
        }
    })

    return AlarmServer
}