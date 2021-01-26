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
              <v-toolbar-title>Create Variable</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Variable Name"
                    name="Variable Name"
                    prepend-icon="mdi-clipboard"
                    type="text"
                    v-model="vname"
                  />
                  <v-combobox
                    :items="datatype"
                    label="Data Type"
                    persistent-hint
                    prepend-icon="mdi-eye"
                    v-model="dtype"
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
                    :items="functioncode"
                    label="Function Code"
                    persistent-hint
                    prepend-icon="mdi-facebook"
                    v-model="fcode"
                  >
                  </v-combobox>
                  <v-text-field
                    label="Address"
                    name="Address"
                    prepend-icon="mdi-json"
                    type="number"
                    v-model="address"
                  />
                  <v-combobox
                    :items="Alarm"
                    label="Configure Alarm"
                    persistent-hint
                    prepend-icon="mdi-eye"
                    v-model="dAlarm"
                  >
                  </v-combobox>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="indigo" dark @click="$router.go(-1)">Cancle</v-btn>
                <v-btn color="indigo" dark @click="CreateVariable()">Creat Variable</v-btn>
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
import createVariableService from '@/services/CreateVariableService'
export default {
  props: {
    source: String
  },
  data () {
    return {
      datatype: ['Digital', 'Integer', 'Real'],
      ioserver: [],
      vname: '',
      dtype: '',
      datasource: '',
      fcode: '',
      address: '',
      error: '',
      company: [],
      companyName: '',
      Alarm: ['1', '0'],
      dAlarm: '',
      functioncode: ['Coil Status', 'Coil Input', 'Read Holding', 'Input Register', 'Write Coil', 'Write Register']
    }
  },
  async mounted () {
    const getIOServer = (await getIOServerService.getIOServer()).data
    console.log(getIOServer)
    getIOServer.forEach(element => {
      this.ioserver.push(element.IPAddress)
    })
    const getCompany = (await getIOServerService.getCompany()).data
    console.log(getCompany)
    getCompany.forEach(element => {
      this.company.push(element.company)
    })
  },
  methods: {
    async CreateVariable () {
      try {
        const response = await createVariableService.CreateVariable({
          Name: this.vname,
          DataType: this.dtype,
          DataSource: this.datasource,
          FunctionCode: this.fcode,
          Address: this.address,
          alarm: this.dAlarm,
          Company: this.companyName
        })
        console.log(response.data)
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
