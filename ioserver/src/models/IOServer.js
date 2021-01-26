module.exports = (sequelize, DataType) => {
const ioserver = sequelize.define ('IOServer', {
    Date: {
        type: DataType.STRING,
    },
    Company: {
        type: DataType.STRING
    },
    IOServer: {
        type: DataType.STRING,
        unique: true
    },
    IPAddress: {
        type: DataType.STRING
    }
})
return ioserver
}