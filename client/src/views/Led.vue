<template>
<div id=app>
<div id=chart-container>
<fusioncharts
:type='type'
:width='width'
:height='height'
:dataformat='dataformat'
:datasource='datasource'
@renderComplete='renderComplete'
v-on:changeData="update($event)"
>
</fusioncharts>
<!-- <div v-on:changeData="update($event)"/> -->
</div>
</div>
</template>
<script>
// import About from '../views/About'
// const jsondata = {
//   'chart': {
//     'caption': 'Fuel Level Indicator',
//     'lowerLimit': '0',
//     'upperLimit': '100',
//     // 'lowerLimitDisplay': 'Empty',
//     // 'upperLimitDisplay': 'Full',
//     'numberSuffix': '%',
//     'valueFontSize': '12',
//     'showhovereffect': '1',
//     'origW': '400',
//     'origH': '150',
//     'ledSize': '3',
//     'ledGap': '2',
//     'manageResize': '1',
//     'theme': 'fusion',
//     'showTickMarks': '0',
//     'showTickValues': '0'
//   },
//   'annotations': {
//     'showbelow': '1',
//     'groups': [
//       {
//         'id': 'indicator',
//         'items': [
//           {
//             'id': 'bgRectAngle',
//             'type': 'rectangle',
//             'alpha': '90',
//             'radius': '1',
//             'fillColor': '#6baa01',
//             'x': '$gaugeCenterX - 20',
//             'tox': '$gaugeCenterX + 20',
//             'y': '$gaugeEndY + 25',
//             'toy': '$gaugeEndY + 45'
//           }
//         ]
//       }
//     ]
//   },
//   // 'colorRange': {
//   //   'color': [
//   //     {
//   //       'minValue': '0',
//   //       'maxValue': '45',
//   //       'code': '#e44a00'
//   //     },
//   //     {
//   //       'minValue': '45',
//   //       'maxValue': '75',
//   //       'code': '#f8bd19'
//   //     },
//   //     {
//   //       'minValue': '75',
//   //       'maxValue': '100',
//   //       'code': '#6baa01'
//   //     }
//   //   ]
//   // },
//   'value': '40'
// }
var temp = 0
export default {
  name: 'app',
  data () {
    return {
      width: '100',
      height: '200',
      type: 'vled',
      dataformat: 'json',
      datasource: {
        'chart': {
          'caption': 'Fuel Level Indicator',
          'lowerLimit': '0',
          'upperLimit': '100',
          // 'lowerLimitDisplay': 'Empty',
          // 'upperLimitDisplay': 'Full',
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
          'showTickValues': '0'
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
                  'fillColor': '#6baa01',
                  'x': '$gaugeCenterX - 20',
                  'tox': '$gaugeCenterX + 20',
                  'y': '$gaugeEndY + 25',
                  'toy': '$gaugeEndY + 45'
                }
              ]
            }
          ]
        },
        'value': this.text
        // 'colorRange': {
        //   'color': [
        //     {
        //       'minValue': '0',
        //       'maxValue': '45',
        //       'code': '#e44a00'
        //     },
        //     {
        //       'minValue': '45',
        //       'maxValue': '75',
        //       'code': '#f8bd19'
        //     },
        //     {
        //       'minValue': '75',
        //       'maxValue': '100',
        //       'code': '#6baa01'
        //     }
        //   ]
        // },
      }
    }
  },
  props: [
    'text'
  ],
  methods: {
    'renderComplete': function (evt, arg) {
      evt.sender.chargeInterval = setInterval(function () {
        // temp = this.$parent.$data.text
        // console.log(this.$parent.text)
        console.log(temp)
        evt.sender.feedData('&value=' + temp)
      }, 2000)
    },
    'disposed': function (evt, arg) {
      clearInterval(evt.sender.chargeInterval)
    },
    update: function (Updatedtitle) {
      temp = Updatedtitle
      console.log('gyugjjk' + temp)
    }
    // 'beforeRender': function (evt, args) {
    //   // Create container div for data table
    //   var msgCont = document.createElement('div')
    //   msgCont.setAttribute('id', 'chart-message')
    //   // Set style for message container
    //   msgCont.style.cssText = 'width : 300px; min-height: 50px; color : #cc0000; font-family : Arial, Helvetica, sans-serif; font-size : 14px; margin-top : 10px;'
    //   // Append container div to page
    //   args.container.parentNode.insertBefore(msgCont, args.container.nextSibling)
    // },
    // 'realtimeUpdateError': function (evt, args) {
    //   document.getElementById('chart-message').innerHTML = '<b>Error Occured !</b><br>Status Code : ' + args.httpStatus
    //   evt.sender.stopUpdate()
    // }
  },
  computed: {
    parentData: function () {
      console.log(this.$parent.$data)
      return this.$parent.$data // or whatever you want to access
    }
  }
}
</script>
<style type="text/css">
    g[class$='creditgroup'] {
         display:none !important;
    }
</style>
