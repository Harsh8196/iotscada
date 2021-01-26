<template>
    <v-card class="ml-2 mr-2" shaped>
        <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{ title }}</v-list-item-title>
                <v-list-item-subtitle>{{ value }} + 'KW'</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar size="45" style="color: red">
                <v-icon dark>{{ icon }}</v-icon>
            </v-list-item-avatar>
        </v-list-item>
    </v-card>
</template>

<script>
export default {
  props: [
    'title',
    'value',
    'color',
    'icon'
  ]
}
</script>
