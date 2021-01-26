module.exports = (sequelize, DataTypes) => {
    const PLCstatus = sequelize.define('PLCstatus', {
        Date: {
            type: DataTypes.STRING,
        },
        Company: {
            type: DataTypes.STRING
        },
        Message: {
            type: DataTypes.STRING
        },
        IPaddress: {
            type: DataTypes.STRING
        },
        Status: {
            type: DataTypes.INTEGER
        } 
    })

    return PLCstatus
}