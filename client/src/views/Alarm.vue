<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="6"
          >
            <v-card class="elevation-12" xs12>
              <v-toolbar
                color="indigo"
                dark
                flat
              >
              <v-toolbar-title>Create Alarm</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Alarm Name"
                    name="Alarm Name"
                    prepend-icon="mdi-clipboard"
                    type="text"
                    v-model="aname"
                  />
                  <v-text-field
                    label="Alarm Description"
                    name="Alarm Description"
                    prepend-icon="mdi-clipboard"
                    type="text"
                    v-model="comments"
                  />
                  <v-combobox
                    :items="alarmtype"
                    label="Alarm Type"
                    persistent-hint
                    prepend-icon="mdi-eye"
                    v-model="atype"
                  >
                  </v-combobox>
                  <v-combobox
                    :items="ioserver"
                    label="IO Server"
                    persistent-hint
                    prepend-icon="mdi-database"
                    v-model="datasource"
                  >
                  </v-combobox>
                  <v-combobox
                    :items="company"
                    label="Company Name"
                    persistent-hint
                    prepend-icon="mdi-buffer"
                    v-model="companyName"
                  >
                  </v-combobox>
                  <v-combobox
                    :items="condition"
                    label="Condition"
                    persistent-hint
                    prepend-icon="mdi-facebook"
                    v-model="cond"
                  >
                  </v-combobox>
                  <v-combobox
                    :items="tname"
                    label="Tag Name"
                    persistent-hint
                    prepend-icon="mdi-facebook"
                    v-model="tagname"
                    @click="getVariable()"
                  >
                  </v-combobox>
                  <!-- <v-text-field
                    label="Condition"
                    name="Condition"
                    prepend-icon="mdi-json"
                    type="number"
                    v-model="condition"
                  /> -->
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="indigo" dark @click="$router.go(-1)">Cancle</v-btn>
                <v-btn color="indigo" dark @click="CreateAlarm()">Creat Alarm</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import getIOServerService from '@/services/CreateIOServerService'
import createAlarmService from '@/services/CreateAlarmService'
import createVariableService from '@/services/CreateVariableService'
export default {
  props: {
    source: String
  },
  data () {
    return {
      alarmtype: ['Digital Alarm', 'Analog Alarm'],
      ioserver: [],
      aname: '',
      atype: '',
      datasource: '',
      cond: '',
      tname: [],
      error: '',
      company: [],
      companyName: '',
      condition: ['0', '1'],
      tagname: '',
      comments: ''
    }
  },
  async mounted () {
    const getIOServer = (await getIOServerService.getIOServer()).data
    getIOServer.forEach(element => {
      this.ioserver.push(element.IPAddress)
      console.log(element.IPAddress)
    })
    const getCompany = (await getIOServerService.getCompany()).data
    console.log(getCompany)
    getCompany.forEach(element => {
      this.company.push(element.company)
    })
  },
  methods: {
    async CreateAlarm () {
      try {
        const response = await createAlarmService.CreateAlarm({
          Name: this.aname,
          AlarmType: this.atype,
          DataSource: this.datasource,
          Condition: this.cond,
          TagName: this.tagname,
          Comments: this.comments,
          Company: this.companyName
        })
        console.log(response.data)
      } catch (error) {
        this.error = error.response.data.error
        console.log(this.error)
      }
    },
    async getVariable () {
      try {
        const response = await createVariableService.getVariable({
          name: this.datasource
        })
        response.data.forEach(element => {
          this.tname.push(element.Name)
        })
      } catch (error) {
        this.error = error.response.data.error
        console.log(this.error)
      }
    },
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>
