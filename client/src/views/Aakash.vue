<template>
  <v-layout>
      <helloworld v-bind:status = PLCstatus />
      <!-- <v-container class="grey lighten-5"> -->
    <v-col cols="12" lg="12" md="12" sm="12" >
    <v-card class="indigo lighten-1" shaped>
    <v-img
              :src="require('../image/turbine_image.jpg')"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              v-bind:height= window.height
      >
    <v-row>
        <!-- Total Energy Generation Card -->
        <v-col cols="12" md="4" sm="6" xs="6">
          <panel title="Total Energy" icon="mdi-chart-arc" unit="KWH" v-bind:energy= KWH color="indigo lighten-1" />
        </v-col>
        <!-- Today Energy Generation Card -->
        <v-col cols="12" md="4" sm="6" xs="6">
          <panel title="Today Energy" icon="mdi-chart-line" unit="KWH" v-bind:energy= TodayEnergyGen color="brown"/>
        </v-col>
        <!-- Yesterday Energy Generation Card -->
        <v-col cols="12" md="4" sm="6" xs="6">
          <panel title="Yesterday Energy" icon=" mdi-chart-pie" unit="KWH" v-bind:energy= YesterdayEnergyGen color="red lighten-1"/>
        </v-col>
    </v-row>
    </v-img>
    </v-card>
    <v-row>
    <v-col cols="12" md="6" sm="12" xs="6">
        <v-card raised>
        <fusioncharts
            :type='type_V'
            v-bind:width= width_V
            v-bind:height= height_V
            :dataFormat='dataFormat_V'
            :dataSource='dataSource_V'
            @initialized='initialized_V'
            @disposed='disposed'
            >
            </fusioncharts>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="12" xs="6">
        <v-card raised>
        <fusioncharts
            :type='type_V'
            v-bind:width= width_V
            v-bind:height= height_V
            :dataFormat='dataFormat_V'
            :dataSource='dataSource_A'
            @initialized='initialized_A'
            @disposed='disposed'
            >
            </fusioncharts>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" sm="12" xs="12">
          <v-card class="mx-auto" color="grey lighten-5">
            <fusioncharts
            :type='type_dt'
            :width='width_dt'
            :height='height_dt'
            :dataFormat='dataformat'
            :dataSource='datasource_DT'
            >
            </fusioncharts>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" sm="12" xs="12">
          <div id=chart-container1>
            <fusioncharts
            :type='type_RPM'
            :width='width_RPM'
            :height='height_RPM'
            :dataFormat='dataFormat_RPM'
            :dataSource='dataSource_RPM'
            @renderComplete='renderComplete_RPM'
            @disposed='disposed'
            >
            </fusioncharts>
          </div>
        </v-col>
    </v-row>
    <v-col cols="12" md="12" sm="12" xs="6">
      <v-card raised>
        <v-row>
      <v-col cols="6" md="1" sm="4" xs="6">
            <fusioncharts
            :type='type'
            :width='width'
            :height='height'
            :dataFormat='dataformat'
            :dataSource='datasource_BCK_P'
            @renderComplete='renderComplete_BCK_P'
            @disposed='disposed'
            >
            </fusioncharts>
        </v-col>
        <v-col cols="6" md="1" sm="4" xs="6">
            <fusioncharts
            :type='type'
            :width='width'
            :height='height'
            :dataFormat='dataformat'
            :dataSource='datasource_IN_P'
            @renderComplete='renderComplete_IN_P'
            @disposed='disposed'
            >
            </fusioncharts>
        </v-col>
        <v-col cols="6" md="1" sm="4" xs="6">
          <div id=chart-container>
            <fusioncharts
            :type='type'
            :width='width'
            :height='height'
            :dataFormat='dataformat'
            :dataSource='datasource_OIL_P'
            @renderComplete='renderComplete_OIL_P'
            @disposed='disposed'
            >
            </fusioncharts>
          </div>
        </v-col>
        <v-col cols="6" md="1" sm="4" xs="6">
          <div id=chart-container>
            <fusioncharts
            :type='type'
            :width='width'
            :height='height'
            :dataFormat='dataformat'
            :dataSource='datasource_HZ'
            @renderComplete='renderComplete_HZ'
            @disposed='disposed'
            >
            </fusioncharts>
          </div>
        </v-col>
        <v-col cols="6" md="1" sm="4" xs="6">
          <div id=chart-container>
            <fusioncharts
            :type='type'
            :width='width'
            :height='height'
            :dataFormat='dataformat'
            :dataSource='datasource_PF'
            @renderComplete='renderComplete_PF'
            @disposed='disposed'
            >
            </fusioncharts>
          </div>
        </v-col>
        <v-col cols="6" md="1" sm="4" xs="6">
          <!-- <div id=chart-container>
            <fusioncharts
            :type='type'
            :width='width'
            :height='height'
            :dataFormat='dataformat'
            :dataSource='datasource_KVAH'
            @renderComplete='renderComplete_KVAH'
            @disposed='disposed'
            >
            </fusioncharts>
          </div> -->
        </v-col>
        <v-col cols="12" md="6" sm="12" xs="6">
          <v-row>
          <v-col cols="12" md="6" sm="12" xs="6">
            <v-card class="indigo lighten-1" shaped>
              <v-card-title>
                <v-row >
                  <div class="subtitle-1 white--text text-uppercase">
                    PID Parameter
                  </div>
                </v-row>
                </v-card-title>
            </v-card>
            <v-card class="grey lighten-2 mt-1" raised>
              <v-card-title class="pt-1 pb-1">
                <v-row class="blue-grey lighten-4 pa-0">
                  <v-col cols="6" md="3" sm="6" xs="2">
                  <div class="subtitle-1 black--text text-uppercase font-weight-bold">
                    PV
                  </div>
                  <v-divider class="grey"></v-divider>
                  <div class="subtitle-1 black--text text-uppercase mt-1 font-weight-bold">
                    OP
                  </div>
                   <v-divider class="grey"></v-divider>
                  <div class="subtitle-1 black--text text-uppercase mt-1 font-weight-bold">
                    SP
                  </div>
                   <v-divider class="grey"></v-divider>
                  <div class="subtitle-1 black--text text-uppercase mt-1 font-weight-bold">
                    ma
                  </div>
                   <v-divider class="grey"></v-divider>
                  </v-col>
                  <v-col cols="6" md="9" sm="6" xs="3">
                  <div class="subtitle-1 black--text text-uppercase ml-12 font-weight-bold">
                    {{PV}}
                  </div>
                  <v-divider class="grey"></v-divider>
                  <div class="subtitle-1 black--text text-uppercase ml-12 mt-1 font-weight-bold">
                    {{OP}}
                  </div>
                   <v-divider class="grey"></v-divider>
                  <div class="subtitle-1 black--text text-uppercase ml-12 mt-1 font-weight-bold">
                    {{SP}}
                  </div>
                   <v-divider class="grey"></v-divider>
                  <div class="subtitle-1 black--text text-uppercase ml-12 mt-1 font-weight-bold">
                    {{MA}}
                  </div>
                   <v-divider class="grey"></v-divider>
                  </v-col>
                </v-row>
                </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" sm="12" xs="6">
            <v-card class="indigo lighten-1" shaped>
              <v-card-title>
                <v-row >
                  <div class="subtitle-1 white--text text-uppercase">
                    Set RPM
                  </div>
                </v-row>
                </v-card-title>
            </v-card>
            <v-card class="grey lighten-2 mt-1" raised>
              <v-card-title class="pt-1 pb-1">
                <v-row class="blue-grey lighten-4 pa-0">
                  <v-col cols="6" md="6" sm="6" xs="4">
                  <div class="subtitle-1 black--text text-uppercase font-weight-bold">
                    Latch RPM
                  </div>
                  <v-divider class="grey"></v-divider>
                  <div class="subtitle-1 black--text text-uppercase mt-1 font-weight-bold">
                    Trip RPM
                  </div>
                   <v-divider class="grey"></v-divider>
                  <div class="subtitle-1 black--text text-uppercase mt-1 font-weight-bold">
                    AOP RPM
                  </div>
                   <v-divider class="grey"></v-divider>
                  </v-col>
                  <v-col cols="6" md="6" sm="6" xs="2">
                  <div class="subtitle-1 black--text text-uppercase ml-12 font-weight-bold">
                    {{LATCH_RPM}}
                  </div>
                  <v-divider class="grey"></v-divider>
                  <div class="subtitle-1 black--text text-uppercase ml-12 mt-1 font-weight-bold">
                    {{TRIP_RPM}}
                  </div>
                   <v-divider class="grey"></v-divider>
                  <div class="subtitle-1 black--text text-uppercase ml-12 mt-1 font-weight-bold">
                    {{AOP_RPM}}
                  </div>
                   <v-divider class="grey"></v-divider>
                  </v-col>
                </v-row>
                </v-card-title>
            </v-card>
          </v-col>
          </v-row>
        </v-col>
        </v-row>
        </v-card>
      </v-col>
      <v-row>
        <v-col cols="12" md="12" sm="12" xs="6">
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="elevation-10 grey lighten-4"
      >
    <template v-slot:item.Comments ="{ item }">
      <v-chip :color="getColor(item.Active)">{{ item.Comments }}</v-chip>
    </template>
    <template v-slot:item.ActiveTime ="{ item }">
      <v-chip :color="getColor(item.Active)">{{ item.ActiveTime }}</v-chip>
    </template>
    <template v-slot:item.DeactiveTime ="{ item }">
      <v-chip :color="getColor(item.Active)">{{ item.DeactiveTime }}</v-chip>
    </template>
    <!-- <template v-slot:item.AckTime ="{ item }">
      <v-chip :color="getColor(item.Active)" dark>{{ item.AckTime }}</v-chip>
    </template> -->
    <template v-slot:top>
      <h1 style="color:white;font-style: inherit" class="grey darken-3"> Alarms </h1>
    </template>
  </v-data-table>
    </v-col>
      </v-row>
      </v-col>
  </v-layout>
</template>

<script>
import Helloworld from '@/components/HelloWorld'
import Panel from '@/views/Card'
import HZ from '@/chart_json/HZ'
import PF from '@/chart_json/PF'
import KVAH from '@/chart_json/KVA'
import BACK_P from '@/chart_json/BCK_P'
import INLET_P from '@/chart_json/IN_P'
import OIL_P from '@/chart_json/Ol_P'
import RPM from '@/chart_json/RPM'
import PV_1 from '@/chart_json/PV_1'
import PV_2 from '@/chart_json/PV_2'
import io from 'socket.io-client/dist/socket.io'
// import mqtt from 'mqtt'
import getAlarmService from '../services/CreateAlarmService'
import DownTime from '@/chart_json/Downtime'
import * as moment from 'moment/moment'
import GetDatalogService from '../services/GetDatalogService'
import getEnergyGenService from '../services/EnergyGenService'
var RY_C_D
var YB_C_D
var BR_C_D
var HZ_D = 0
var PF_D = 0
var KVAH_D = 0
var RPM_D = 0
var Alarm = []
var test
var R_V
var Y_V
var B_V
var BACK_P_D, INLET_P_D, OIL_P_D
var todayen = moment(new Date()).format('DD-MM-YYYY')
var tomorrow = moment(new Date()).add(1, 'days').format('DD-MM-YYYY')
var yesterday = moment(new Date()).add(-1, 'days').format('DD-MM-YYYY')
export default {
  data (vm) {
    return {
      window: {
        width: 0,
        height: 0
      },
      socket: null,
      r1: null,
      mqttData: [],
      width: '100',
      height: '250',
      type: 'vled',
      dataformat: 'json',
      datasource_HZ: HZ,
      datasource_PF: PF,
      datasource_KVAH: KVAH,
      datasource_BCK_P: BACK_P,
      datasource_IN_P: INLET_P,
      datasource_OIL_P: OIL_P,
      type_RPM: 'angulargauge',
      width_RPM: '100%',
      height_RPM: '250',
      dataFormat_RPM: 'json',
      dataSource_RPM: RPM,
      type_V: 'realtimeline',
      width_V: 0,
      height_V: 0,
      dataFormat_V: 'json',
      dataSource_V: PV_2,
      dataSource_A: PV_1,
      ditached1: false,
      width_dt: '500',
      height_dt: '250',
      type_dt: 'doughnut2d',
      datasource_DT: DownTime,
      headers: [
        {
          text: 'Alarm Name',
          value: 'Comments'
        },
        { text: 'Active Time', value: 'ActiveTime' },
        { text: 'Deactive Time', value: 'DeactiveTime' }
      ],
      headers_DownT: [
        { text: 'Downtime Date', value: 'Date' },
        { text: 'UV/OV', value: 'UV_OV' },
        { text: 'High Temp Trip', value: 'HighTemp' },
        { text: 'Over Load Trip', value: 'OverLoad' },
        { text: 'Over Speed Trip', value: 'OverSpeed' },
        { text: 'Emergency Stop', value: 'Emergency' }
      ],
      desserts: Alarm,
      KWH: 0,
      Energy_TD: todayen,
      Energy_YD: yesterday,
      Energy_TMD: tomorrow,
      YesterdayEnergyGen: 0,
      TodayEnergyGen: 0,
      SP: 0,
      OP: 0,
      PV: 0,
      MA: 0,
      LATCH_RPM: 0,
      TRIP_RPM: 0,
      AOP_RPM: 0,
      CompanyName: 'AakashFeb',
      PLCstatus: ''
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
    clearInterval(test)
    console.log('DestroyEvent' + test)
    this.disposed()
    console.log(this.disposed())
  },
  methods: {
    handleResize () {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
      if (window.innerWidth < 600) {
        this.window.height = 800
        this.width_V = '100%'
        this.height_V = 350
      }
      if (window.innerWidth > 600 && window.innerWidth < 960) {
        this.window.height = 800
        this.width_V = '100%'
        this.height_V = 350
      }
      if (window.innerWidth > 960 && window.innerWidth < 1264) {
        this.window.height = 300
        this.width_V = '100%'
        this.height_V = 350
      }
      if (window.innerWidth > 1264 && window.innerWidth < 1904) {
        this.window.height = 300
        this.width_V = '100%'
        this.height_V = 350
      }
    },
    renderComplete_HZ: function (evt, arg) {
      test = setInterval(function () {
        evt.sender.setData('&value=' + HZ_D)
      }, 1000)
    },
    renderComplete_PF: function (evt, arg) {
      test = setInterval(function () {
        evt.sender.setData('&value=' + (PF_D))
        console.log(evt)
      }, 1000)
    },
    renderComplete_KVAH: function (evt, arg) {
      test = setInterval(function () {
        evt.sender.setData('&value=' + KVAH_D)
      }, 1000)
    },
    renderComplete_BCK_P: function (evt, arg) {
      test = setInterval(function () {
        evt.sender.setData('&value=' + BACK_P_D)
      }, 1000)
    },
    renderComplete_IN_P: function (evt, arg) {
      test = setInterval(function () {
        evt.sender.setData('&value=' + INLET_P_D)
      }, 1000)
    },
    renderComplete_OIL_P: function (evt, arg) {
      test = setInterval(function () {
        evt.sender.setData('&value=' + OIL_P_D)
      }, 1000)
    },
    renderComplete_RPM: function (evt, arg) {
      test = setInterval(function () {
        evt.sender.feedData('&value=' + RPM_D)
      }, 1000)
    },
    initialized_V: function (evt, arg) {
      var chartRef = evt.sender
      function updateData () {
        var t = new Date()
        var date = t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds()
        var strData = '&label=' + date + '&value=' + R_V + '|' + Y_V + '|' + B_V
        chartRef.setData(strData)
      }
      chartRef.intervalUpdateId = setInterval(updateData, 1000)
    },
    initialized_A: function (evt, arg) {
      var chartRef = evt.sender
      function updateData () {
        var t = new Date()
        var date = t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds()
        var strData = '&label=' + date + '&value=' + RY_C_D + '|' + YB_C_D + '|' + BR_C_D
        // set it to chart.
        chartRef.setData(strData)
      }
      chartRef.intervalUpdateId = setInterval(updateData, 1000)
    },
    'disposed': function (evt, arg) {
      clearInterval(test)
      console.log(clearInterval(test))
    },
    async GetAlarm () {
      try {
        const response = await getAlarmService.GetAlarm({
          Company: this.CompanyName
        })
        Alarm.splice(0, 10)
        response.data.forEach(element => {
          Alarm.push(element)
        })
      } catch (error) {
        console.log(error)
      }
    },
    getColor (Active) {
      console.log(Active)
      if (Active === 1) return 'red'
    },
    async GetTDEnergyGen () {
      try {
        const response = await getEnergyGenService.GetTD_EnergyGen({
          today: this.Energy_TD + ' 00:00:00',
          tomorrow: this.Energy_TMD + ' 00:00:00',
          Company: this.CompanyName
        })
        this.TodayEnergyGen = response.data[0].KWH
      } catch (error) {
        console.log(error)
      }
    },
    async GetYDEnergyGen () {
      try {
        const response = await getEnergyGenService.GetYD_EnergyGen({
          today: this.Energy_TD + ' 00:00:00',
          yesterday: this.Energy_YD + ' 00:00:00',
          Company: this.CompanyName
        })
        this.YesterdayEnergyGen = response.data[0].KWH
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    },
    async GetTDDowntime () {
      try {
        const response = await GetDatalogService.GetTDDowntime()
        console.log(response.data)
        this.datasource_DT.data[0].value = response.data[0].UV_OV / 3600
        this.datasource_DT.data[1].value = response.data[0].HighTemp / 3600
        this.datasource_DT.data[2].value = response.data[0].OverLoad / 3600
        this.datasource_DT.data[3].value = response.data[0].EmergencyStop / 3600
        this.datasource_DT.data[4].value = response.data[0].OverSpeed / 3600
      } catch (error) {
        console.log(error)
      }
    }
  },
  components: {
    Helloworld,
    Panel
  },
  mounted () {
    // const client = mqtt.connect('ws://localhost:1883/ws')
    // console.log('Connect')
    // client.on('connect', () => {
    // // Inform controllers that garage is connected
    //   client.subscribe('AakashFashion', { qos: 0 })
    //   console.log('Connect to Mqtt server')
    // })
    // client.on('disconnect', () => {
    // // Inform controllers that garage is connected
    //   // client.subscribe('AakashFashion', { qos: 0 })
    //   console.log('disConnect to Mqtt server')
    // })
    this.socket = io.connect('http://localhost:8083/data')
    this.socket.on('connect', (data) => {
      console.log(this.socket.connected)
      console.log(this.socket.id)
    })
    this.socket.on('AakashFeb_data', (data) => {
      // const Result = message.toString()
      // this.mqttData = JSON.parse(Result)
      console.log(data)
      this.r1 = data
      if (this.r1.length !== 0) {
        RY_C_D = this.r1[0].data
        YB_C_D = this.r1[1].data
        BR_C_D = this.r1[2].data
        R_V = this.r1[3].data
        Y_V = this.r1[4].data
        B_V = this.r1[5].data
        HZ_D = this.r1[19].data
        RPM_D = this.r1[7].data
        PF_D = this.r1[6].data
        BACK_P_D = this.r1[11].data
        INLET_P_D = this.r1[12].data
        OIL_P_D = 0
        KVAH_D = 0
        this.KWH = this.r1[20].data
        this.PV = this.r1[2].data
        this.OP = this.r1[4].data / 100
        this.SP = this.r1[5].data
        this.MA = this.r1[5].data
        this.LATCH_RPM = this.r1[5].data
        this.TRIP_RPM = this.r1[5].data
        this.AOP_RPM = this.r1[5].data
      }
    })
    this.socket.on('AlarmClient', (data) => {
      console.log(data)
      this.GetAlarm()
      this.socket.emit('AlarmRecive', { trig: 1 })
    })
    this.socket.on('AakashFashion_Status', (data) => {
      // console.log(data)
      this.PLCstatus = data
      // console.log(PLCstatus)
    })
    this.GetAlarm()
    this.GetTDEnergyGen()
    this.GetYDEnergyGen()
    this.GetTDDowntime()
  }
}
</script>
<style>
.corner {
  border-radius: 15px
};
.grad {
  background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
};
.test {
  text-decoration-color: blue;
  font-style: inherit
}
</style>
