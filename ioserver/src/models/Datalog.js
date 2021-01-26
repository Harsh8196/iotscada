module.exports = (sequelize, DataTypes) => {
    const Datalog = sequelize.define('Datalog', {
        Date_Time: {
            type: DataTypes.STRING,
        },
        Energy: {
            type: DataTypes.REAL
        },
        R_Current: {
            type: DataTypes.REAL
        },
        Y_Current: {
            type: DataTypes.REAL
        },
        B_Current: {
            type: DataTypes.REAL
        },
        RY_Voltage: {
            type: DataTypes.REAL
        },
        YB_Voltage: {
            type: DataTypes.REAL
        },
        BR_Voltage: {
            type: DataTypes.REAL
        },
        RPM: {
            type: DataTypes.REAL
        },
        Back_Pressure: {
            type: DataTypes.REAL
        },
        Inlet_Pressure: {
            type: DataTypes.REAL
        },
        Freq: {
            type: DataTypes.REAL
        },
        PF: {
            type: DataTypes.REAL
        },
        R_Power: {
            type: DataTypes.REAL
        },
        Y_Power: {
            type: DataTypes.REAL
        },
        B_Power: {
            type: DataTypes.REAL
        },
        T_Power: {
            type: DataTypes.REAL
        },
        Company: {
            type: DataTypes.STRING
        }
    })

    return Datalog
}