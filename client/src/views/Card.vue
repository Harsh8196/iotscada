<template>
  <v-card class="mx-auto ml-2 mr-2" color="grey lighten-5" max-width="100%" shaped>
    <v-card-title>
      <v-icon
        v-bind:color = color
        class="mr-12"
        size="64">
        {{icon}}
      </v-icon>
      <v-row align="start">
        <div class="caption grey--text text-uppercase">
          {{title}}
        </div>
        <div>
          <span
            class="display-2 font-weight-black"
            v-text="energy"
          ></span>
          <strong>{{unit}}</strong>
        </div>
      </v-row>
    </v-card-title>
    <v-sheet color="transparent">
      <v-sparkline
        :value="value"
        :smooth="16"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        :line-width="3"
        auto-draw
        stroke-linecap="round"
      ></v-sparkline>
    </v-sheet>
  </v-card>
</template>>

<script>
export default {
  data () {
    return {
      value: [0, 2, 5, 8, 5, 8, 3, 5, 0, 0, 1, 8, 2, 8, 0]
    }
  },
  props: [
    'title', 'icon', 'unit', 'energy', 'color'
  ]
}
</script>
