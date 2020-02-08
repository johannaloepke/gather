<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <h1 class="display-1 font-weight-bold mt-3">
            {{ name }}
        </h1>
        <h2 class="font-weight-bold">
            {{ date }}, {{ time }}
        </h2>
        <h2 class="font-weight-bold">
            {{ location }}
        </h2>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import { db } from '../db.js'

const events = db.collection('events')
export default {
  props: {
    id: String,
  },
  components: {
  },
  data: () => ({
    loading: false,
    eventDetails: {}
  }),
  computed: {
      name() {
          return this.eventDetails.name
      },
      date() {
          let date = this.eventDetails.date
          if (date) {
            date = date.toDate().toString().split(":")[0].slice(0, -3)
          }
          return date
      },
      time() {
          return this.eventDetails.time
      },
      location() {
          return this.eventDetails.location
      },
    //   eventDetails() {
    //       console.log(events.doc(this.id))
    //     return events.doc(this.id)
    //   }
        
  },
  created() {
  },
  watch: {
    id: {
        handler(id) {
            console.log('in watcher')
            console.log(this)
            // console.log(events.doc(id))
            this.$bind('eventDetails', events.doc(id))
            // ).then(eventDetails => {
            //     console.log(eventDetails)
            //     // eventDetails will point to the same property declared in data
            //     this.eventDetails === eventDetails
            // })
        }, 
        deep:true, immediate: true, // call it upon creation too
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
