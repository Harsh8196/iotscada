<template>
    <v-layout>
      <helloworld/>
      <!-- <v-container class="grey lighten-5"> -->
    <v-col cols="12" lg="12" md="12" sm="12" >
    <v-card class="indigo lighten-1" shaped>
    <v-img
              :src="require('../image/turbine_image.jpg')"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              v-bind:height= window.height
      >
    <v-row style="height: 140px;">
    </v-row>
    <v-row>
      <v-col cols="12" md="3" sm="6" xs="6">
        <v-card class="ml-2 mr-2" shaped>
        <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">Energy</v-list-item-title>
                <v-list-item-title class="headline mb-0">{{KWH}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar size="45" color="blue-grey">
                <v-icon dark>mdi-chart-arc</v-icon>
            </v-list-item-avatar>
        </v-list-item>
    </v-card>
      </v-col>
      <v-col cols="12" md="3" sm="6" xs="6">
        <v-card class="ml-2 mr-2" shaped>
        <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">RY Voltage</v-list-item-title>
                <v-list-item-title class="headline mb-0">{{R_V}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar size="45" color="red">
                <v-icon dark>mdi-chart-line</v-icon>
            </v-list-item-avatar>
        </v-list-item>
    </v-card>
      </v-col>
      <v-col cols="12" md="3" sm="6" xs="6">
        <v-card class="ml-2 mr-2" shaped>
        <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">YB Line Voltage</v-list-item-title>
                <v-list-item-title class="headline mb-0">{{Y_V}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar size="45" color="amber">
                <v-icon dark>mdi-chart-bell-curve</v-icon>
            </v-list-item-avatar>
        </v-list-item>
    </v-card>
      </v-col>
      <v-col cols="12" md="3" sm="6" xs="6">
        <v-card class="ml-2 mr-2" shaped>
        <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">BR Voltage</v-list-item-title>
                <v-list-item-title class="headline mb-0">{{B_V}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar size="45" color="brown">
                <v-icon dark>mdi-chart-timeline-variant</v-icon>
            </v-list-item-avatar>
        </v-list-item>
    </v-card>
      </v-col>
    </v-row>
    </v-img>
    </v-card>
    <row style="height: 14px;">
      <div class="mt-2 mb-2">
        <!-- <h1 style="color:white;font-style: inherit" class="black darken-4"> PARAMETERS </h1> -->
      </div>
    </row>
    <v-col cols="12" md="12" sm="12" xs="6">
      <v-card raised>
      <v-row>
        <v-col cols="6" md="1" sm="4" xs="6">
            <fusioncharts
            :type='type'
            :width='width'
            :height='height'
            :dataFormat='dataformat'
            :dataSource='datasource_RY'
            @renderComplete='renderComplete_RY'
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
            :dataSource='datasource_YB'
            @renderComplete='renderComplete_YB'
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
            :dataSource='datasource_BR'
            @renderComplete='renderComplete_BR'
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
          <div id=chart-container>
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
          </div>
        </v-col>
        <v-col cols="12" md="6" sm="12" xs="6">
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
      </v-card>
      </v-col>
      <v-row>
      <v-col cols="12" md="5" sm="12" xs="6">
        <v-card raised>
        <fusioncharts
            :type='type_PV'
            v-bind:width= width_PV
            v-bind:height= height_PV
            :dataFormat='dataFormat_PV'
            :dataSource='dataSource_PV'
            @initialized='initialized'
            @disposed='disposed'
            >
            </fusioncharts>
        </v-card>
      </v-col>
    <v-col cols="12" md="7" sm="12" xs="6">
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
  <!-- </v-container> -->
    </v-layout>
</template>>

<script>
import Helloworld from '@/components/HelloWorld'
import RY_C from '@/chart_json/RY_V'
import YB_C from '@/chart_json/YB_V'
import BR_C from '@/chart_json/BR_V'
import HZ from '@/chart_json/HZ'
import PF from '@/chart_json/PF'
import KVAH from '@/chart_json/KVA'
import RPM from '@/chart_json/RPM'
import PV_1 from '@/chart_json/PV_1'
import io from 'socket.io-client/dist/socket.io'
import getAlarmService from '../services/CreateAlarmService'
// import FusionCharts from 'fusioncharts'
var RY_C_D
var YB_C_D
var BR_C_D
var HZ_D = 0
var PF_D = 0
var KVAH_D = 0
var RPM_D = 0
var PV_1_D = 0
var PV_2_D = 0
var Alarm = []
var test
// var handler = function (e) {
//   console.log(e)
// }
export default {
  data () {
    return {
      window: {
        width: 0,
        height: 0
      },
      socket: null,
      r1: null,
      width: '100',
      height: '250',
      type: 'vled',
      dataformat: 'json',
      datasource_RY: RY_C,
      datasource_YB: YB_C,
      datasource_BR: BR_C,
      datasource_HZ: HZ,
      datasource_PF: PF,
      datasource_KVAH: KVAH,
      type_RPM: 'angulargauge',
      width_RPM: '100%',
      height_RPM: '250',
      dataFormat_RPM: 'json',
      dataSource_RPM: RPM,
      type_PV: 'realtimeline',
      width_PV: 0,
      height_PV: 0,
      dataFormat_PV: 'json',
      dataSource_PV: PV_1,
      ditached1: false,
      // singleSelect: false,
      // selected: [],
      headers: [
        {
          text: 'Alarm Name',
          value: 'Comments'
        },
        { text: 'Active Time', value: 'ActiveTime' },
        { text: 'Deactive Time', value: 'DeactiveTime' }
        // { text: 'Ack Time', value: 'AckTime' }
      ],
      desserts: Alarm,
      KWH: 0,
      R_V: 0,
      Y_V: 0,
      B_V: 0
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
    // removeEventListener({ type: 'evt', listener: this.renderComplete_YB })
    // removeEventListener({ type: 'evt', listener: this.renderComplete_BR })
    // removeEventListener({ type: 'evt', listener: this.renderComplete_HZ })
    // removeEventListener({ type: 'evt', listener: this.renderComplete_PF })
    // removeEventListener({ type: 'evt', listener: this.renderComplete_KVAH })
    // removeEventListener({ type: 'evt', listener: this.renderComplete_RPM })
  },
  methods: {
    handleResize () {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
      if (window.innerWidth < 600) {
        this.window.height = 600
        this.width_PV = 330
        this.height_PV = 400
      }
      if (window.innerWidth > 600 && window.innerWidth < 960) {
        this.window.height = 370
        this.width_PV = 600
        this.height_PV = 400
      }
      if (window.innerWidth > 960 && window.innerWidth < 1264) {
        this.window.height = 250
        this.width_PV = 600
        this.height_PV = 400
      }
      if (window.innerWidth > 1264 && window.innerWidth < 1904) {
        this.window.height = 250
        this.width_PV = 600
        this.height_PV = 400
      }
    },
    renderComplete_RY: function (evt, arg) {
      test = setInterval(function () {
        // RY_V_D = RY_V_D + 1
        evt.sender.setData('&value=' + RY_C_D)
        console.log(test)
        console.log(evt.sender)
      }, 1000)
    },
    renderComplete_YB: function (evt, arg) {
      test = setInterval(function () {
        // YB_V_D = YB_V_D + 1
        evt.sender.setData('&value=' + YB_C_D)
      }, 1000)
      // evt.sender.stopUpdate()
      // clearInterval(evt.sender.chargeInterval)
    },
    renderComplete_BR: function (evt, arg) {
      test = setInterval(function () {
        // BR_V_D = BR_V_D + 1
        evt.sender.setData('&value=' + BR_C_D)
      }, 1000)
      // evt.sender.stopUpdate()
      // clearInterval(evt.sender.chargeInterval)
    },
    renderComplete_HZ: function (evt, arg) {
      test = setInterval(function () {
        // HZ_D = HZ_D + 1
        evt.sender.setData('&value=' + HZ_D)
      }, 1000)
      // evt.sender.stopUpdate()
      // clearInterval(evt.sender.chargeInterval)
    },
    renderComplete_PF: function (evt, arg) {
      test = setInterval(function () {
        // PF_D = PF_D + 1
        evt.sender.setData('&value=' + (PF_D))
        console.log(evt)
      }, 1000)
      // evt.sender.stopUpdate()
      // clearInterval(evt.sender.chargeInterval)
    },
    renderComplete_KVAH: function (evt, arg) {
      test = setInterval(function () {
        // KVAH_D = KVAH_D + 1
        evt.sender.setData('&value=' + KVAH_D)
      }, 1000)
      // evt.sender.stopUpdate()
      // clearInterval(evt.sender.chargeInterval)
    },
    renderComplete_RPM: function (evt, arg) {
      test = setInterval(function () {
        // RPM_D = RPM_D + 1
        // console.log(RPM_D)
        evt.sender.feedData('&value=' + RPM_D)
        // clearInterval(evt.sender.chargeInterval)
      }, 1000)
      // evt.sender.stopUpdate()
      // clearInterval(evt.sender.chargeInterval)
    },
    // removeHandler: function () {
    //   removeEventListener('renderComplete', this.renderComplete_RY)
    //   this.ditached1 = true
    //   console.log(this.ditached1)
    //   console.log('remove event is trigger')
    // },
    'initialized': function (evt, arg) {
      var chartRef = evt.sender
      function updateData () {
        var t = new Date()
        var date = t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds()
        var strData = '&label=' + date + '&value=' + PV_1_D + '|' + PV_2_D
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
        const response = await getAlarmService.GetAlarm()
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
    }
  },
  components: {
    Helloworld
  },
  mounted () {
    this.socket = io.connect('http://pai-automation.in:8082/data')
    this.socket.on('connect', (data) => {
      console.log(this.socket.connected)
      console.log(this.socket.id)
    })
    this.socket.on('m_data', (data) => {
      // console.log(data)
      this.r1 = data.data
      if (this.r1.length !== 0) {
        RY_C_D = this.r1[17].data
        YB_C_D = this.r1[18].data
        BR_C_D = this.r1[19].data
        this.R_V = this.r1[20].data
        this.Y_V = this.r1[21].data
        this.B_V = this.r1[22].data
        HZ_D = this.r1[15].data
        RPM_D = this.r1[31].data
        PF_D = this.r1[27].data
        PV_1_D = this.r1[28].data
        PV_2_D = this.r1[29].data
        KVAH_D = this.r1[26].data
        this.KWH = this.r1[16].data
      }
    })
    this.socket.on('AlarmClient', (data) => {
      console.log(data)
      this.GetAlarm()
      this.socket.emit('AlarmRecive', { trig: 1 })
    })
    this.GetAlarm()
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
