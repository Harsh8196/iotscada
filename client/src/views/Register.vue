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
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="indigo"
                dark
                flat
              >
              <v-toolbar-title>Register form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account-circle-outline"
                    type="text"
                    v-model="userName"
                    required :rules="[required]"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                    required :rules="[required]"
                  />

                  <v-text-field
                    label="Company"
                    name="company"
                    prepend-icon="mdi-account-circle-outline"
                    type="text"
                    v-model="companyName"
                    required :rules="[required]"
                  />
                </v-form>
              </v-card-text>
              <div class="error" v-html="error" />
              <v-card-actions>
                <v-spacer />
                <v-btn color="indigo" dark @click="register">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'
export default {
  data () {
    return {
      userName: null,
      companyName: null,
      password: null,
      error: null,
      required: (value) => !!value || 'Required'
    }
  },
  props: {
    source: String
  },
  methods: {
    async register (user) {
      try {
        const response = await AuthenticationService.Register({
          email: this.userName,
          password: this.password,
          company: this.companyName
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.userName = null
        this.password = null
        console.log(response.data)
        this.$router.push('login')
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>
<style scoped>
.error {
  color: white;
}
</style>
