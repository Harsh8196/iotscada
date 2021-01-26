import sql_queryy.sqlquery as sql_query
import controller.modbusServer as data
import controller.mqttpub as mqtt


SQLHelper = sql_query.DBHelper()
##Ioserver = Helper.q_ReadIOServer()
ModBusHelper = data.Modbusserver()
ModBusHelper.readServer(SQLHelper.q_ReadIOServer())
ModBusHelper.readLimit(SQLHelper.q_GetLimitFromVar())
ModBusHelper.readAllLimit(SQLHelper.q_GetLimit())
ModBusHelper.readVariable(SQLHelper.q_ReadVariable())
ModBusHelper.modbusRead()
mqtt.run()
#MqttData = mqtt.MqttPublish()
#MqttData.RunInterval()

