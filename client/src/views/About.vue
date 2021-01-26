<template>
  <v-layout>
  <div>
    <v-text-field label="Text" v-model="text">
    </v-text-field>
    <v-btn class="cyan" @click="send"> Send </v-btn>
  </div>
  <div>
    <h1>Test: {{ r1[0].data }} </h1>
    <br>
    <h1>Test: {{ r1[1].data }} </h1>
    <br>
    <h1>Test: {{ r1[2].data }} </h1>
    </div>
  <div id=chart-container class="test">
    <fusioncharts
    :type='type'
    :width='width'
    :height='height'
    :dataFormat='dataformat'
    :dataSource='datasource'
    @renderComplete='renderComplete'
    >
    </fusioncharts>
    <!-- <div v-on:changeData="update($event)"/> -->
    </div>
    <div id=chart-container>
    <fusioncharts
    :type='type'
    :width='width'
    :height='height'
    :dataFormat='dataformat'
    :dataSource='datasource1'
    @renderComplete='renderComplete1'
    >
    </fusioncharts>
    <!-- <div v-on:changeData="update($event)"/> -->
    </div>
  </v-layout>
</template>

<script>
import io from 'socket.io-client/dist/socket.io'
import chart from '@/chart_json/Chart'
// var socket = io.connect('http://localhost:8082/data')
// this.socket.on('Data', function (data1) {
//   this.r1 = data1.data
//   console.log(this.r1)
//   this.socket.emit('disconnect', { myData: 'User Disconnected' })
// import led from '../views/Led'
// })
var temp = 0
var temp1 = 0
export default {
  data () {
    return {
      text: null,
      r1: null,
      timer: '',
      socket: null,
      width: '100',
      height: '200',
      type: 'vled',
      dataformat: 'json',
      datasource: chart,
      datasource1: {
        'chart': {
          'caption': 'Fuel Level Indicator',
          'lowerLimit': '0',
          'upperLimit': '100',
          'numberSuffix': '%',
          'valueFontSize': '12',
          'showhovereffect': '1',
          'origW': '400',
          'origH': '150',
          'ledSize': '3',
          'ledGap': '2',
          'manageResize': '1',
          'theme': 'fusion',
          'showTickMarks': '0',
          'showTickValues': '0',
          'bgColor': '#000000'
        },
        'annotations': {
          'showbelow': '1',
          'groups': [
            {
              'id': 'indicator',
              'items': [
                {
                  'id': 'bgRectAngle',
                  'type': 'rectangle',
                  'alpha': '90',
                  'radius': '1',
                  'fillColor': '#ffffff',
                  'x': '$gaugeCenterX - 20',
                  'tox': '$gaugeCenterX + 20',
                  'y': '$gaugeEndY + 25',
                  'toy': '$gaugeEndY + 45'
                }
              ]
            }
          ]
        },
        'colorRange': {
          'color': [
            {
              'minValue': '0',
              'maxValue': '100',
              'code': '#e91e6'
            }
          ]
        },
        'value': '30'
      }
    }
  },
  created: function () {
    // this.timer = setInterval(this.fetchEventsList(), 20000)
  },
  mounted () {
    // this.socket = io.connect('http://localhost:8082/data')
    // this.socket.on('connect', function (data) {
    //   console.log(data)
    // })
    // console.log('mounted')
    // // console.log(this.socket)
    // this.fetchEventsList()
    this.timer = setInterval(() => {
      this.fetchEventsList()
    }, 1000)
    this.socket = io.connect('http://localhost:8082/data')
    this.socket.on('connect', (data) => {
      console.log(this.socket.connected)
      console.log(this.socket.id)
    })
    this.socket.on('m_data', (data) => {
      // console.log(data)
      this.r1 = data.data
      temp = this.r1[0].data
      temp1 = this.r1[1].data
    })
    this.socket.on('AlarmClient', (data) => {
      console.log(data)
    })
    // const news = io.connect('http://localhost:8082/news')
    // news.on('item', () => {
    //   news.emit('wooh')
    // })
  },
  methods: {
    send () {
      // const A1 = this.text
      // this.socket.emit('myData', { my: A1 })
    },
    fetchEventsList () {
      // setInterval(() => {
      //   this.socket.on('Data', function (data1) {
      //     this.r1 = data1.data
      //     console.log(this.r1)
      //     console.log('try' + this.socket)
      //     // this.io.emit('disconnect', { my: 'fjgjh' }
      //   })
      //   // this.socket.disconnect()
      //   console.log('after' + this.r1)
      // }, 20000)
      // // this.socket.close()
      // // this.socket.on('Data', function (data1) {
      // //   this.r1 = data1.data
      // //   console.log(this.r1)
      // // })
      // console.log(this.socket.connected)
      // this.socket.on('test', (data) => {
      //   console.log(data)
      // })
    },
    'renderComplete': function (evt, arg) {
      evt.sender.chargeInterval = setInterval(function () {
        // temp = this.$parent.$data.text
        // console.log(this.$parent.text)
        // temp = temp + 1
        console.log(temp)
        evt.sender.feedData('&value=' + temp)
      }, 1000)
    },
    'renderComplete1': function (evt, arg) {
      evt.sender.chargeInterval = setInterval(function () {
        // temp = this.$parent.$data.text
        // console.log(this.$parent.text)
        console.log(temp1)
        evt.sender.feedData('&value=' + temp1)
      }, 1000)
    },
    cancelAutoUpdate () { clearInterval(this.timer) }
  },
  beforeDestroy () {
    clearInterval(this.timer)
    console.log('beforedistroy')
    this.socket.disconnect()
    console.log('connected' + this.socket.connected)
    console.log('disconnect' + this.socket.disconnected)
  },
  components: {
    // led
  }
}
</script>
<style>
  .test {
    background-color: black;
  }
</style>
