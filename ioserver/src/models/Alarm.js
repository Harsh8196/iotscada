module.exports = (sequelize, DataTypes) => {
    const Alarm = sequelize.define('Alarm', {
        Name: {
            type: DataTypes.STRING,
            unique: true
        },
        AlarmType: {
            type: DataTypes.STRING
        },
        DataSource: {
            type: DataTypes.STRING
        },
        Condition: {
            type: DataTypes.INTEGER
        },
        TagName: {
            type: DataTypes.STRING 
        },
        status: {
            type: DataTypes.INTEGER 
        },
        Comments: {
            type: DataTypes.STRING 
        },
        Company: {
            type: DataTypes.STRING 
        }
    })

    return Alarm
}