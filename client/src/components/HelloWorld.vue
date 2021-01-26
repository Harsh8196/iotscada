<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list>
      <v-list-group
        v-for="item in infoOne"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="subItem in item.items"
          :key="subItem.title"
          router :to="subItem.route"
        >
          <!-- <v-list-item-content class="item-list"> -->
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
            <v-icon v-text="subItem.action"></v-icon>
          <!-- </v-list-item-content> -->
        </v-list-item>
      </v-list-group>
    </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down centre">Smart Mornitoring System</span>
      </v-toolbar-title>
      <v-spacer />
      <div>
        <span class="red">{{status}}</span>
      </div>
      <div class="text-center">
    <v-menu :close-on-content-click="closeOnContentClick" offset-y v-if="user === 'Admin'">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" text >
          <v-icon left>mdi-all-inclusive</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(menuItems, index) in menuItem"
          :key="index"
          @click="dialog = menuItems.click"
          router :to="menuItems.route"
        >
          <v-list-item-title>{{ menuItems.title}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog
        v-model="dialog" width="800px"
      >
        <v-card>
        <v-card-title class="card-title">
          Create IO Server
        </v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col
              class="align-center justify-space-between"
              cols="12"
            >
              <v-row
                align="center"
                class="mr-0"
              >
                <v-combobox
                    :items="company"
                    label="Company Name"
                    persistent-hint
                    prepend-icon="mdi-buffer"
                    v-model="companyName"
                    required :rules="[required]"
                  >
                  </v-combobox>
                <!--v-text-field
                  placeholder="Company Name"
                  prepend-icon="mdi-buffer"
                  v-model="company"
                  required :rules="[required]"
                /-->
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-database"
                placeholder="IO Server"
                v-model="ioserver"
                required :rules="[required]"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                placeholder="IP Address"
                prepend-icon="mdi-firebase"
                v-model="ipaddress"
                required :rules="[required]"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="rgb(4, 133, 219)"
            @click="dialog = false"
            dark
          >Cancel</v-btn>
          <v-btn
            color="rgb(4, 133, 219)"
            @click="CreateIOServer()"
            dark
          >Save</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
  </div>
      <v-btn text @click="navigateTo('register')" v-if="!isUserLogedIn">
        <v-icon left>mdi-account-circle</v-icon>Register
      </v-btn>
      <v-btn text @click="navigateTo('login')" v-if="!isUserLogedIn">
        <v-icon left>mdi-key</v-icon>Login
      </v-btn>
      <v-btn text @click="logout" v-if="isUserLogedIn">
        <v-icon left>mdi-logout</v-icon>Logout
      </v-btn>
      <v-btn text>
        <v-icon left>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
  </v-app>
</template>

<script>
import CreateIOServerService from '@/services/CreateIOServerService'
export default {
  data () {
    return {
      dialog: false,
      drawer: false,
      error: '',
      items: [
        {
          action: 'mdi-alpha-a-circle',
          title: 'Aakash',
          active: true,
          items: [
            { title: 'Dashboard', route: '/aakash', action: 'mdi-monitor-dashboard' },
            { title: 'Report', route: '/aakashreport', action: 'mdi-chart-areaspline' }
          ]
        },
        {
          action: 'mdi-alpha-b-circle',
          title: 'Omkar',
          active: true,
          items: [
            { title: 'Dashboard', route: '/omkar', action: 'mdi-monitor-dashboard' },
            { title: 'Report', route: '/omkarreport', action: 'mdi-chart-areaspline' }
          ]
        }
      ],
      menuItem: [
        {
          title: 'IO Server',
          click: true
        },
        {
          title: 'Variable',
          route: '/variable'
        },
        {
          title: 'Alarm',
          route: '/alarm'
        }
      ],
      closeOnContentClick: true,
      company: [],
      companyName: '',
      ioserver: '',
      ipaddress: '',
      required: (value) => !!value || 'Required',
      user: null,
      token: null,
      isUserLogedIn: false
    }
  },
  async mounted () {
    this.user = localStorage.getItem('user')
    this.token = localStorage.getItem('token')
    console.log(this.user)
    console.log(this.token)
    console.log(this.isUserLogedIn)
    const getCompany = (await CreateIOServerService.getCompany()).data
    console.log(getCompany)
    getCompany.forEach(element => {
      this.company.push(element.company)
    })
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async CreateIOServer () {
      try {
        const response = await CreateIOServerService.CreateIOServer({
          Date: 'Now()',
          Company: this.companyName,
          IOServer: this.ioserver,
          IPAddress: this.ipaddress
        })
        console.log(response.data)
      } catch (error) {
        this.error = error.response.data.error
        console.log(this.error)
      }
      this.dialog = false
    },
    logout () {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('isuserlogedin')
      this.$router.push('/login')
    }
  },
  // props: {
  //   source: String,
  // },
  props: [
    'status'
  ],
  created () {
    this.isUserLogedIn = localStorage.getItem('isuserlogedin')
    if (!this.isUserLogedIn) {
      this.$router.push('/login')
    }
  },
  computed: {
    infoOne: function () {
      if (this.user === 'Admin') {
        return this.items
      } else {
        return this.items.filter(i => i.title === this.user)
      }
    }
  }
}
</script>

<style>
.item-list {
  text-align: center
}
.card-title {
  background:rgb(4, 133, 219);
  color: azure
}
</style>
