module.exports = (sequelize, DataTypes) => {
    const Limit = sequelize.define('Limit', {
      min: {
        type: DataTypes.INTEGER,
        unique: true
      },
      max: DataTypes.INTEGER,
      code: DataTypes.INTEGER
    })
    return Limit
}