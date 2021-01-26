<template>
  <v-layout>
    <helloworld/>
    <v-col cols="12" lg="12" md="12" sm="12" >
      <v-row>
        <!-- This Column For Datalog -->
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-card class="mx-auto" color="grey lighten-4" raised>
          <v-row>
            <!-- Start Date For Datalog -->
              <v-col cols="12" md="4" sm="4" xs="4">
                <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="StartDate"
                        label="Start Date"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title @input="menu1 = false" :show-current="true"></v-date-picker>
                </v-menu>
              </v-col>
              <!-- End Date For Datalog -->
              <v-col cols="12" md="4" sm="4" xs="4">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="EndDate"
                        label="End Date"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date1" no-title @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <!-- Search Btn Date For Datalog -->
              <v-col cols="12" md="4" sm="4" xs="4">
                <v-btn @click="GetDatalogData()" dark class="blue darken-3">
                Search
              </v-btn>
            </v-col>
          </v-row>
          </v-card>
          <v-row>
            <!-- Datalog Table -->
            <v-col cols="12" md="12" sm="12" xs="12">
              <v-data-table
                :headers="headers"
                :items="table"
                :items-per-page="5"
                class="elevation-10 grey lighten-4">
              <!-- <template v-slot:item.Comments ="{ item }">
                <v-chip :color="getColor(item.Active)">{{ item.Comments }}</v-chip>
              </template>
              <template v-slot:item.ActiveTime ="{ item }">
                <v-chip :color="getColor(item.Active)">{{ item.ActiveTime }}</v-chip>
              </template>
              <template v-slot:item.DeactiveTime ="{ item }">
                <v-chip :color="getColor(item.Active)">{{ item.DeactiveTime }}</v-chip>
              </template> -->
              <!-- <template v-slot:item.AckTime ="{ item }">
                <v-chip :color="getColor(item.Active)" dark>{{ item.AckTime }}</v-chip>
              </template> -->
                <template v-slot:top>
                  <h3 style="color:white;font-style: inherit" class="grey darken-3"> Data Summary Report </h3>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-col>
        <!-- This Column For Alarm -->
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-card class="mx-auto" color="grey lighten-4" raised>
          <v-row>
            <!-- Start Date For Alarm -->
            <v-col cols="12" md="4" sm="4" xs="4">
              <v-menu
                v-model="menu1_Alm"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="StartDate_Alm"
                    label="Start Date"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date_Alm" no-title @input="menu1_Alm = false" :show-current="true"></v-date-picker>
              </v-menu>
            </v-col>
            <!-- End Date For Alarm -->
            <v-col cols="12" md="4" sm="4" xs="4">
              <v-menu
                v-model="menu2_Alm"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="EndDate_Alm"
                    label="End Date"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date1_Alm" no-title @input="menu2_Alm = false"></v-date-picker>
              </v-menu>
            </v-col>
            <!-- Search Date For Alarm -->
            <v-col cols="12" md="4" sm="4" xs="4">
              <v-btn @click="GetAlarm()" dark class="blue darken-3">
              Search
              </v-btn>
            </v-col>
          </v-row>
          </v-card>
          <v-row>
            <!-- Alarm Table -->
            <v-col cols="12" md="12" sm="12" xs="12">
              <v-data-table
                :headers="headers_alarm"
                :items="AlarmData"
                :items-per-page="5"
                class="elevation-10 grey lighten-4">
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
                  <h3 style="color:white;font-style: inherit" class="grey darken-3"> Alarms </h3>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <!-- This Column For EnergyGen -->
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-card class="mx-auto" color="grey lighten-4" raised>
          <v-row>
            <!-- Start Date For EnergyGen -->
              <v-col cols="12" md="4" sm="4" xs="4">
                <v-menu
                  v-model="menu1_Ene"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="StartDate_Ene"
                        label="Start Date"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date_Ene" no-title @input="menu1_Ene = false" :show-current="true"></v-date-picker>
                </v-menu>
              </v-col>
              <!-- End Date For EnergyGen -->
              <v-col cols="12" md="4" sm="4" xs="4">
                <v-menu
                  v-model="menu2_Ene"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="EndDate_Ene"
                        label="End Date"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date1_Ene" no-title @input="menu2_Ene = false"></v-date-picker>
                </v-menu>
              </v-col>
              <!-- Search Btn Date For EnergyGen -->
              <v-col cols="12" md="4" sm="4" xs="4">
                <v-btn @click="GetEnergyGen()" dark class="blue darken-3">
                Search
              </v-btn>
            </v-col>
          </v-row>
          </v-card>
          <v-row>
            <!-- EnergyGen Table -->
            <v-col cols="12" md="12" sm="12" xs="12">
              <v-data-table
                :headers="headers_Ene"
                :items="EnergyGenData"
                :items-per-page="5"
                class="elevation-10 grey lighten-4">
              <!-- <template v-slot:item.Comments ="{ item }">
                <v-chip :color="getColor(item.Active)">{{ item.Comments }}</v-chip>
              </template>
              <template v-slot:item.ActiveTime ="{ item }">
                <v-chip :color="getColor(item.Active)">{{ item.ActiveTime }}</v-chip>
              </template>
              <template v-slot:item.DeactiveTime ="{ item }">
                <v-chip :color="getColor(item.Active)">{{ item.DeactiveTime }}</v-chip>
              </template> -->
              <!-- <template v-slot:item.AckTime ="{ item }">
                <v-chip :color="getColor(item.Active)" dark>{{ item.AckTime }}</v-chip>
              </template> -->
                <template v-slot:top>
                  <h3 style="color:white;font-style: inherit" class="grey darken-3"> Energy Generation Report </h3>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-col>
        <!-- This Column For Downtime -->
        <v-col cols="12" md="6" sm="12" xs="12">
          <v-card class="mx-auto" color="grey lighten-4" raised>
          <v-row>
            <!-- Start Date For Downtime -->
            <v-col cols="12" md="4" sm="4" xs="4">
              <v-menu
                v-model="menu1_DownT"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="StartDate_DownT"
                    label="Start Date"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date_DownT" no-title @input="menu1_DownT = false" :show-current="true"></v-date-picker>
              </v-menu>
            </v-col>
            <!-- End Date For Downtime -->
            <v-col cols="12" md="4" sm="4" xs="4">
              <v-menu
                v-model="menu2_DownT"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="EndDate_DownT"
                    label="End Date"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date1_DownT" no-title @input="menu2_DownT = false"></v-date-picker>
              </v-menu>
            </v-col>
            <!-- Search Date For Downtime -->
            <v-col cols="12" md="4" sm="4" xs="4">
              <v-btn @click="GetDowntimeReport()" dark class="blue darken-3">
              Search
              </v-btn>
            </v-col>
          </v-row>
          </v-card>
          <v-row>
            <!-- Downtime Table -->
            <v-col cols="12" md="12" sm="12" xs="12">
              <v-data-table
                :headers="headers_DownT"
                :items="DownTimeData"
                :items-per-page="5"
                class="elevation-10 grey lighten-4">
                <!-- <template v-slot:item.Comments ="{ item }">
                  <v-chip :color="getColor(item.Active)">{{ item.Comments }}</v-chip>
                </template>
                <template v-slot:item.ActiveTime ="{ item }">
                  <v-chip :color="getColor(item.Active)">{{ item.ActiveTime }}</v-chip>
                </template>
                <template v-slot:item.DeactiveTime ="{ item }">
                  <v-chip :color="getColor(item.Active)">{{ item.DeactiveTime }}</v-chip>
                </template> -->
                <!-- <template v-slot:item.AckTime ="{ item }">
                  <v-chip :color="getColor(item.Active)" dark>{{ item.AckTime }}</v-chip>
                </template> -->
                <template v-slot:top>
                  <h3 style="color:white;font-style: inherit" class="grey darken-3"> DownTime Summary Report (HH:mm:ss) </h3>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-layout>
</template>

<script>
import Helloworld from '@/components/HelloWorld'
import GetDatalogService from '../services/GetDatalogService'
import getAlarmService from '../services/CreateAlarmService'
import getEnergyGenService from '../services/EnergyGenService'
import * as moment from 'moment/moment'
import DownTime from '@/chart_json/Downtime'
var DatalogData = []
var Alarm = []
var DownTimeD = []
var EnergyGen = []
var tomorrow = moment(new Date()).add(1, 'days')
var yesterday = moment(new Date()).add(-1, 'days')
var startMonth = moment(new Date()).add(0, 'months').subtract(moment(new Date()).get('date'), 'days').add(1, 'days')
var test = moment(new Date()).get('date')
export default {
  data (vm) {
    return {
      error: '',
      startDate: '',
      endDate: '',
      table: DatalogData,
      headers: [
        { text: 'DateTime', value: 'Date_Time' },
        { text: 'Energy', value: 'Energy' },
        { text: 'R Current', value: 'R_Current' },
        { text: 'Y Current', value: 'Y_Current' },
        { text: 'B Current', value: 'B_Current' },
        { text: 'RY Voltage', value: 'RY_Voltage' },
        { text: 'YB Voltage', value: 'YB_Voltage' },
        { text: 'BR Voltage', value: 'BR_Voltage' },
        { text: 'RPM', value: 'RPM' },
        { text: 'Back Pressure', value: 'Back_Pressure' },
        { text: 'Inlet Pressure', value: 'Inlet_Pressure' },
        { text: 'Frequency', value: 'Freq' },
        { text: 'PF', value: 'PF' },
        { text: 'R Power', value: 'R_Power' },
        { text: 'Y Power', value: 'Y_Power' },
        { text: 'B Power', value: 'B_Power' },
        { text: 'Total Power', value: 'T_Power' }
      ],
      headers_alarm: [
        { text: 'Alarm Name', value: 'Comments' },
        { text: 'Active Time', value: 'ActiveTime' },
        { text: 'Deactive Time', value: 'DeactiveTime' }
        // { text: 'Ack Time', value: 'AckTime' }
      ],
      headers_Ene: [
        { text: 'Date', value: 'Date' },
        { text: 'Energy Generation', value: 'Energy' }
      ],
      headers_DownT: [
        { text: 'Downtime Date', value: 'Date' },
        { text: 'UV/OV', value: 'UV_OV' },
        { text: 'High Temp Trip', value: 'HighTemp' },
        { text: 'Over Load Trip', value: 'OverLoad' },
        { text: 'Over Speed Trip', value: 'OverSpeed' },
        { text: 'Emergency Stop', value: 'Emergency' }
      ],
      AlarmData: Alarm,
      EnergyGenData: EnergyGen,
      DownTimeData: DownTimeD,
      date: new Date().toISOString().substr(0, 10),
      date1: tomorrow.toISOString().substr(0, 10),
      date_Alm: new Date().toISOString().substr(0, 10),
      date1_Alm: tomorrow.toISOString().substr(0, 10),
      date_Ene: startMonth.toISOString().substr(0, 10),
      date1_Ene: new Date().toISOString().substr(0, 10),
      date_DownT: new Date().toISOString().substr(0, 10),
      date1_DownT: tomorrow.toISOString().substr(0, 10),
      Energy_TD: moment().format('DD-MM-YYYY'),
      Energy_YD: yesterday.format('DD-MM-YYYY'),
      Energy_TMD: tomorrow.format('DD-MM-YYYY'),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      menu1_Alm: false,
      menu2_Alm: false,
      menu1_Ene: false,
      menu2_Ene: false,
      menu1_DownT: false,
      menu2_DownT: false,
      value: [0, 2, 5, 9, 5, 10, 3, 5, -4, -5, 1, 8, 2, 9, 0],
      width: '500',
      height: '320',
      type: 'doughnut2d',
      dataformat: 'json',
      datasource_DT: DownTime,
      TodayEnergyGen: '',
      YesterdayEnergyGen: '',
      CompanyName: 'AakashFeb'
    }
  },
  components: {
    Helloworld
  },
  mounted () {
    this.GetDatalogData()
    this.GetAlarm()
    // console.log(tomorrow.toISOString(true).substr(0, 10))
    // console.log('StartMonth: ' + startMonth.toISOString(true).substr(0, 10))
    // console.log('Yesterday: ' + this.Energy_YD)
    // console.log('Tomorrow: ' + this.Energy_TMD)
    console.log('test', test)
    this.GetTDEnergyGen()
    this.GetYDEnergyGen()
    this.GetTDDowntime()
    this.GetDowntimeReport()
    this.GetEnergyGen()
    console.log(this.dateFormatted)
  },
  // beforeMount () {
  //   location.reload()
  //   console.log('------------------------------')
  // },
  methods: {
    async GetDatalogData () {
      try {
        const response = await GetDatalogService.GetDatalogValue({
          startDate: this.date + ' 00:00:00',
          endDate: this.date1 + ' 00:00:00',
          Company: this.CompanyName
        })
        DatalogData.splice(0, DatalogData.length)
        response.data.forEach(element => {
          DatalogData.push(element)
        })
        console.log(response)
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
      }
    },
    async GetAlarm () {
      try {
        const response = await getAlarmService.GetAlarmData({
          startDate: this.date_Alm + ' 00:00:00',
          endDate: this.date1_Alm + ' 00:00:00',
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
    async GetEnergyGen () {
      try {
        const response = await getEnergyGenService.GetEnergyGen({
          startMonth: this.date_Ene,
          today: this.date1_Ene,
          Company: this.CompanyName
        })
        EnergyGen.splice(0, EnergyGen.length)
        response.data.forEach(element => {
          EnergyGen.push(element)
        })
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
    },
    async GetDowntimeReport () {
      try {
        const response = await GetDatalogService.GetDowntimeD({
          startMonth: this.date_DownT,
          today: this.date1_DownT,
          Company: this.CompanyName
        })
        console.log(response.data)
        DownTimeD.splice(0, DownTimeD.length)
        response.data.forEach(element => {
          DownTimeD.push(element)
        })
      } catch (error) {
        console.log(error)
      }
    },
    getColor (Active) {
      console.log(Active)
      if (Active === 1) return 'red'
    },
    formatDate (date) {
      if (!date) return null
      console.log(date)
      const [day, month, year] = date.split('-')
      console.log([day, month, year])
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null
      console.log(date)
      const [month, day, year] = date.split('/')
      // console.log([month, day, year])
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  },
  computed: {
    StartDate () {
      return this.date ? moment(this.date).format('DD-MM-YYYY') : ''
    },
    EndDate () {
      return this.date1 ? moment(this.date1).format('DD-MM-YYYY') : ''
    },
    StartDate_Alm () {
      return this.date_Alm ? moment(this.date_Alm).format('DD-MM-YYYY') : ''
    },
    EndDate_Alm () {
      return this.date1_Alm ? moment(this.date1_Alm).format('DD-MM-YYYY') : ''
    },
    StartDate_Ene () {
      return this.date_Ene ? moment(this.date_Ene).format('DD-MM-YYYY') : ''
    },
    EndDate_Ene () {
      return this.date1_Ene ? moment(this.date1_Ene).format('DD-MM-YYYY') : ''
    },
    StartDate_DownT () {
      return this.date_DownT ? moment(this.date_DownT).format('DD-MM-YYYY') : ''
    },
    EndDate_DownT () {
      return this.date1_DownT ? moment(this.date1_DownT).format('DD-MM-YYYY') : ''
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
      this.dateFormatted = this.formatDate(this.date_Alm)
      this.dateFormatted = this.formatDate(this.date_Ene)
      this.dateFormatted = this.formatDate(this.date_DownT)
    },
    date1 (val) {
      this.dateFormatted = this.formatDate(this.date1)
      this.dateFormatted = this.formatDate(this.date1_Alm)
      this.dateFormatted = this.formatDate(this.date1_Ene)
      this.dateFormatted = this.formatDate(this.date1_DownT)
    }
  }
}
</script>
