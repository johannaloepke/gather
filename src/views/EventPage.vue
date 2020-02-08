<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <h1 class="display-1 font-weight-bold mt-3 pa-5">
          { eventName }
        </h1>
        <h2 class="display-1 font-weight-bold">
          { date }
        </h2>
        <h2 class="display-1 font-weight-bold">
          { time }
        </h2>

    </v-layout>
  </v-container>
</template>

<script>
import { db } from './db.js'

const events = db.collection('events')
export default {
  props: ['eventId'],
  components: {
  },
  data: () => ({
    loading: false,
    eventDetails: []
  }),
  created() {
  },
  watch: {
    id: {
      // call it upon creation too
      immediate: true,
      handler(eventId) {
        this.$bind('event', events.doc(eventId)).then(eventDetails => {
            // eventDetails will point to the same property declared in data
            this.eventDetails === eventDetails
        })
      },
    },
  },
  methods: {
    submit() {
    }
  },
  beforeDestroy () {
    // Teardown leaky properties https://alligator.io/vuejs/component-lifecycle/
  },
};
</script>

<style scoped>
.v-btn {
  font-size: 1.5em;
}
h1 {
  font-family: 'Amatic SC', cursive;
}
</style>
