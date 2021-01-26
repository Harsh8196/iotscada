var m_IOSever = []
var m_Variable = []
var m_Limit = []
var m_AllLimit = []
var connection_handle = null
var modbus = require("modbus-stream")
var A1 = null
var m_FunctionCode = ['Read Holding', 'Coil Status']

module.exports = {
  modbusdata (res1) {
    A1 = res1
    return A1
  },
  readServer (iosever) {
    m_IOSever = iosever
  },
  readVariable (tags) {
    m_Variable = tags
  },
  readLimit (limits) {
    m_Limit = limits
  },
  readAllLimit (limits) {
    m_AllLimit = limits
  },
  modbusRead () {
    function ReadHoldingRegister(connection,startAdd,m_ReadHoldingVar) {

      connection.readHoldingRegisters({ address: startAdd, quantity: 100, extra: { unitId: 1} }, (_err, res) => {
        connection.on('error', (err) => {
        console.error('connect', err)
        })
      console.log('inside ReadHolding__'+startAdd)

      if(res){

        m_ReadHoldingVar.forEach((variable) => {

          if(variable.DataType === 'Integer') {

            const I1 = Buffer.from(res.response.data[variable.Address - 1 - startAdd]).readInt16BE(0)
            variable.data = I1
            console.log(variable.Name+' Add: '+ variable.Address + '---' + I1)

          } else {
              const R1 = Buffer.from(res.response.data[variable.Address -1 - startAdd]).readInt16BE(0)
              const R2 = Buffer.from(res.response.data[variable.Address - startAdd]).readInt16BE(0)
              if(R1 != 0 || R2 != 0) {
              const buf = Buffer.allocUnsafe(4)
              buf.fill(0)
              buf.writeInt16BE(R1,2)
              buf.writeInt16BE(R2,0)
              // console.log(Buffer.from(res.response.data[value.Address - 1]))
              // console.log(Buffer.from(res.response.data[value.Address]))
              // console.log(buf)
              const F1=buf.readFloatBE(0)
              variable.data = F1.toFixed(2)
                  console.log(variable.Name+' Add: '+ variable.Address + '---' + variable.data)
              } else {
                variable.data = 0.0  
                  console.log(variable.Name+' Add: '+ variable.Address + '---' + 0.0)
              }
          }
        })
      }
      })
      return 
    }
    function ReadCoil(connection,startAdd,m_CoilVar) {

      connection.readCoils({ address: startAdd, quantity: 90, extra: { unitId: 1 } }, (_err, res) => {
        connection.on('error', (err) => {
            console.error('connect', err)
        })
        if(res){
            m_CoilVar.forEach((value) => {      
              const d1 = res.response.data[value.Address-1 - startAdd]
              value.data = d1
              if(value.alarm == 1) {
                  console.log('Alarm is Configure')
              }
              console.log(value.Name+ '---' + d1)
            })
          }
    })
      console.log('Read Coils')
      return
    }
    function next() {
      m_IOSever.forEach((ioserver) => {
        modbus.tcp.connect(502, ioserver.IPAddress, { debug: 'test', retry: 2000 }, (error,connection) => {
          if(!error) {
            connection_handle = connection

            connection_handle.on("error", (err) => {
            
            console.log("connection error", err)

            connection_handle = null
            })
            const findIP = ioserver.IPAddress
            console.log(findIP+'find Ip')

            const m_ReqVariable = m_Variable.filter((variable) => {

              return variable.DataSource === ioserver.IPAddress
            })
            m_Limit.forEach((limitVar) => {
              const limit = m_AllLimit.filter((limit) => {
                return limit.code == limitVar.code
              })
              const startAdd = limit[0].min
              console.log('---------------'+startAdd)
              const m_limitVar = m_ReqVariable.filter((variable) => {
                return variable.code == limitVar.code
              })
              m_FunctionCode.forEach((Fun_C) => {
                switch(Fun_C) {
                  case 'Read Holding': {
                    const m_ReadHoldingVar = m_limitVar.filter((variable) => {
                      return variable.FunctionCode === 'Read Holding'
                      })
                      ReadHoldingRegister(connection,startAdd,m_ReadHoldingVar)
                      break
                    }
                  case 'Coil Status': {
                    const m_CoilVar = m_limitVar.filter((variable) => {
                      return variable.FunctionCode === 'Coil Status'
                    })
                    ReadCoil(connection,startAdd,m_CoilVar)
                    break
                    }
                  default:
                    console.log('No function code found')
                }
              })
            })
            connection.close(() => {
              console.log("connection closed");
            })
          }
          console.log('server is disconnect or not found: ' + ioserver.IPAddress)
        })
      })
    }
    setInterval(() => {
      next()
    }, 2000)
  },
  read () {
    var m_Data = []
    m_Data.slice(0,m_Data.length)
    m_Variable.forEach((data) => {
      m_Data.push({DataSource:data.DataSource,Name:data.Name,data:data.data,alarm:data.alarm})
    })
    return m_Data
  }
}