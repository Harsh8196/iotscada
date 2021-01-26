module.exports = {
    port: process.env.PORT || 8083,
    db: {
        database: 'SCADA',
        user: 'postgres',
        password: 'H8196@Arsh',
        options: {
            host: '104.248.49.155',
            dialect: 'postgres',
            timezone: '+05:30',
            port: 5432,
            dialectOptions: {
                options: {
                  useUTC: false,
                  dateFirst: 1,
                }
              }
        }
    },
    authentication: {
      jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}