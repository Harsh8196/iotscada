module.exports = (sequelize, DataTypes) => {
    const Variable = sequelize.define('Variable', {
        Name: {
            type: DataTypes.STRING,
            unique: true
        },
        DataType: {
            type: DataTypes.STRING
        },
        DataSource: {
            type: DataTypes.STRING
        },
        FunctionCode: {
            type: DataTypes.STRING
        },
        Address: {
            type: DataTypes.INTEGER 
        },
        data: {
            type: DataTypes.REAL
        },
        alarm: {
            type: DataTypes.INTEGER
        },
        code: DataTypes.INTEGER
        ,
        Company: {
            type: DataTypes.STRING
    }
    })

    return Variable
}