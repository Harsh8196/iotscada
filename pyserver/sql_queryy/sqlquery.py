import psycopg2
import datetime
CompanyName = 'AakashFeb'
quots = "'"

class DBHelper:
    def __init__(self):
        while True:
            self.conn = psycopg2.connect(database='SCADA', user='postgres', password='H8196@Arsh', host='104.248.49.155', port= '5432')
            cursor = self.conn.cursor()
            try:
                cursor.execute("select version()")
            except psycopg2.OperationalError:
                continue
            break

        # try:
        #     self.conn = psycopg2.connect(database='SCADA', user='postgres', password='H8196@Arsh', host='104.248.49.155', port= '5432')
        # except:
        #     print("I am unable to connect to the database")

        cursor = self.conn.cursor()
        cursor.execute("select version()")
        data = cursor.fetchone()
        print("Connection established to: ",data)
        
    def q_ReadIOServer(self):
        cursor = self.conn.cursor()
        cursor.execute('select "IPAddress" from public."IOServers" where "Company" = '+quots+''+CompanyName+''+quots+'')
        #print ('select "IPAddress" from public."IOServers" where "Company" = '+quots+''+CompanyName+''+quots+'')
        return cursor.fetchall()

    def q_GetLimitFromVar(self):
        cursor = self.conn.cursor()
        cursor.execute('Select distinct "code" from public."Variables"')
        return cursor.fetchall()

    def q_GetLimit(self):
        cursor = self.conn.cursor()
        cursor.execute('Select * FROM public."Limits"')
        return cursor.fetchall()

    def q_ReadVariable(self):
        cursor = self.conn.cursor()
        cursor.execute('select * from public."Variables" where "Company" = '+quots+''+CompanyName+''+quots+'')
        return cursor.fetchall()

    def q_ReadAlarm(self):
        cursor = self.conn.cursor()
        cursor.execute('select * from public."Alarms" where "Company" = '+quots+''+CompanyName+''+quots+'')
        return cursor.fetchall()

    """def PLC_Status(self,msg,ipaddress):
        cursor = self.conn.cursor()
        x = datetime.datetime.now()
        dt = x.strftime("%d")+'-'+x.strftime("%m")+'-'+x.strftime("%Y") +' '+x.strftime("%H")+':'+x.strftime("%M")+':'+x.strftime("%S")
        #tm = x.strftime("%H")+':'+x.strftime("%M")+':'+x.strftime("%S")
        print(type(msg))
        print(ipaddress)
        if(msg == 'Disconnect'):
            cursor.execute('Select * From public."PLCstatuses" where "Company" = '+quots+''+CompanyName+''+quots+' and "Message" = '+quots+'Disconnect'+quots+' ')
            cursor.execute('INSERT INTO public."PLCstatuses" (id, "Date", "Company", "Message", "IPaddress", "createdAt", "updatedAt") VALUES (1,'+quots+''+dt+''+quots+', '+quots+''+CompanyName+''+quots+','+quots+''+msg+''+quots+', '+quots+''+ipaddress+''+quots+','+quots+''+dt+''+quots+', '+quots+''+dt+''+quots+')')"""

#helper = DBHelper()
#helper.q_ReadIOServer()
#helper.q_GetLimitFromVar()
#helper.q_GetLimit()
#helper.q_ReadVariable()
#helper.q_ReadAlarm()