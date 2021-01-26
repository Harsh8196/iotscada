from pymodbus.constants import Endian
from pymodbus.payload import BinaryPayloadDecoder
from pymodbus.payload import BinaryPayloadBuilder
from pymodbus.client.sync import ModbusTcpClient as ModbusClient
from pymodbus.compat import iteritems
from collections import OrderedDict
import json
from controller.mqttpubPLC import pubPLCStatus as mqttpubPLCStatus
import logging
from threading import Timer
#import time, threading
UNIT = 0x1
Data = {}
PLCStatus = []
FinalData = []
CompanyName = "AakashFeb"
WAIT_SECONDS = 10
"""FORMAT = ('%(asctime)-15s %(threadName)-15s '
          '%(levelname)-8s %(module)-15s:%(lineno)-8s %(message)s')
logging.basicConfig(format=FORMAT)
log = logging.getLogger()
log.setLevel(logging.DEBUG)

ORDER_DICT = {
    "<": "LITTLE",
    ">": "BIG"
}"""

#SqlHelper = sql_query

class Modbusserver:
    
    def __init__(self):
        #m_IOSever = []
        #m_Variable = []
        #m_Limit = []
        #m_AllLimit = []
        self.m_FunctionCode = ['Read Holding', 'Coil Status']
        print(self)

    def readServer(self,ioserver):
        self.m_IOSever = ioserver
        print(self.m_IOSever)

    def readVariable(self,tags):
        self.m_Variable = tags
        print(self.m_Variable)

    def readLimit(self,limits):
        self.m_Limit = limits
        print(self.m_Limit)

    def readAllLimit(self,limits):
        self.m_AllLimit = limits
        print(self.m_AllLimit)

    def modbusRead(self):
        
        def ReadHoldingRegister(self,client,startAdd,m_ReadHoldingVar):
            rr = client.read_holding_registers(startAdd, 100, unit=UNIT)
            #print(startAdd)
            #print(rr.registers)
            if not rr.isError():
                for ReadHoldingVariable in m_ReadHoldingVar:
                    if(ReadHoldingVariable[2] == 'Integer'):
                        address=ReadHoldingVariable[5]-startAdd
                        #print(ReadHoldingVariable)
                        #print(startAdd)
                        #print(rr.registers)
                        TagValue=rr.registers[address]
                        Data.update({'Name':ReadHoldingVariable[1],'Company':ReadHoldingVariable[9],'data':TagValue,'alarm':ReadHoldingVariable[7]})
                        FinalData.append({'Name':ReadHoldingVariable[1],'Company':ReadHoldingVariable[9],'data':TagValue,'alarm':ReadHoldingVariable[7]})
                        #print(a1)
                        #decoder = BinaryPayloadDecoder.fromRegisters(a1, Endian.Big, wordorder=Endian.Little)
                        #print(decoder.decode_16bit_int())
                        #print(ReadHoldingVariable[2])
                    if(ReadHoldingVariable[2] == 'Real'):
                        address=ReadHoldingVariable[5]-startAdd
                        a1=rr.registers[address]
                        a2=rr.registers[address+1]
                        new = []
                        new.append(a1)
                        new.append(a2)
                        #print(new)
                        decoder = BinaryPayloadDecoder.fromRegisters(new, Endian.Big, wordorder=Endian.Little)
                        #print(ReadHoldingVariable)
                        TagValue=round(decoder.decode_32bit_float(), 2)
                        Data.update({'Name':ReadHoldingVariable[1],'Company':ReadHoldingVariable[9],'data':TagValue,'alarm':ReadHoldingVariable[7]})
                        FinalData.append({'Name':ReadHoldingVariable[1],'Company':ReadHoldingVariable[9],'data':TagValue,'alarm':ReadHoldingVariable[7]})
                        #print(decoder.decode_32bit_float())
            return
        
        def ReadCoil(self,client,startAdd,m_CoilVar):
            rr = client.read_coils(startAdd, 100, unit=UNIT)
            #print(startAdd)
            #print(rr.registers)
            if not rr.isError():
                for CoilVar in m_CoilVar:
                    if(CoilVar[2] == 'Digital'):
                        address=CoilVar[5]-startAdd
                        #print(ReadHoldingVariable)
                        #print(startAdd)
                        #print(rr.registers)
                        TagValue=rr.bits[address-1]
                        Data.update({'Name':CoilVar[1],'Company':CoilVar[9],'data':TagValue,'alarm':CoilVar[7]})
                        FinalData.append({'Name':CoilVar[1],'Company':CoilVar[9],'data':TagValue,'alarm':CoilVar[7]})
                        #Data.update({CoilVar[1]:TagValue})
                        #print(a1)
                        #decoder = BinaryPayloadDecoder.fromRegisters(a1, Endian.Big, wordorder=Endian.Little)
                        #print(decoder.decode_16bit_int())
                        #print(ReadHoldingVariable[2])
            return

        def error_checker(instance):
            if not instance.isError():
                """.isError() implemented in pymodbus 1.4.0 and above."""
                decoder = BinaryPayloadDecoder.fromRegisters(
                    instance.registers, byteorder=Endian.Big, wordorder=Endian.Little
                )
                return decoder.decode_32bit_float()
            else:
                # Error handling.
                return None
        print(self.m_IOSever)
        FinalData.clear()
        for x in self.m_IOSever:
            ioServer = x[0]
            print(ioServer)
            client = ModbusClient(ioServer, port=502)
            try:
                client.connect()
                #rq = client.write_registers(1, [10]*8, unit=UNIT)
                #print(self.m_Variable)
                if client.connect():
                    PLCStatus.append({'Company':CompanyName,'Ipaddress':ioServer,'status':'Connect'})
                    msg=json.dumps(PLCStatus) 
                    mqttpubPLCStatus(msg)
                    PLCStatus.clear()
                    m_ReqVariable = [item for item in self.m_Variable if item[3]== ioServer]

                    for limit in self.m_Limit:
                        m_limit = [item for item in self.m_AllLimit if item[3]== limit[0]]
                        #print(m_limit)
                        startAdd = (m_limit[0])[1]
                        #print(startAdd)

                        m_limitVar = [item for item in m_ReqVariable if item[8]== limit[0]]
                        #print(m_limitVar)

                        for FunctionCode in self.m_FunctionCode:
                            if FunctionCode == 'Read Holding':
                                m_ReadHoldingVar = [item for item in m_limitVar if item[4]== 'Read Holding']
                                #print(m_ReadHoldingVar)
                                ReadHoldingRegister(self,client,startAdd,m_ReadHoldingVar)

                            if FunctionCode == 'Coil Status':
                                m_CoilVar = [item for item in m_limitVar if item[4]== 'Coil Status']
                                #print(m_CoilVar)
                                ReadCoil(self,client,startAdd,m_CoilVar)
                                
                else:
                    print("Server is not Connected.")
                    PLCStatus.append({'Company':CompanyName,'Ipaddress':ioServer,'status':'Disconnect'})
                    msg=json.dumps(PLCStatus) 
                    mqttpubPLCStatus(msg)
                    PLCStatus.clear()

                            
                
                
                """rr = client.read_holding_registers(0, 10, unit=UNIT)
                c = error_checker(rr)
                print("length: ", c)
                #assert(not rq.isError())     # test that we are not an error
                ##assert(rr.registers == [10]*8)      # test the expected value
                print(rr.registers)
                a1=rr.registers[0]
                a2=rr.registers[1]
                new = []
                new.append(a1)
                new.append(a2)
                print(new)
                decoder = BinaryPayloadDecoder.fromRegisters(new, Endian.Big, wordorder=Endian.Little)
                print(decoder.decode_32bit_float())"""
            except Exception as exc:
                print(exc)
            finally:
                client.close()
        """for x in self.m_Variable:
            test = x[2]
            if (x[2] == 'Integer'):
                print(test)"""

        Timer(2,self.modbusRead).start()
    
    def Read(self):
        return FinalData

            

  

        
        
    