<template>
  <v-container>
  <v-form
    ref="form"
    v-model="isValid"
  >
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <h1 class="display-1 mt-3 pa-5">
          Let's get started 🎉
        </h1>

        <v-layout justify-center>
          <v-flex lg4 md6 xs8>
            
            <!-- Event Name -->
            <v-text-field
              v-model="eventName"
              :rules="eventNameRules"
              :counter="40"
              label="Event name"
              required
            ></v-text-field>

            <!-- Date Picker -->
            <v-dialog
              ref="dialog"
              v-model="dateDialog"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Date of event"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="dateDialog = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>

            <!-- Time -->
            <v-text-field
              v-model="time"
              class="pt-7"
              label="Time frame (optional)"
            ></v-text-field>

            <!-- Location -->
            <v-text-field
              v-model="location"
              class="pt-7"
              label="Location (optional)"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
      
      <!-- Next Button -->
      <v-layout justify-center>
        <v-flex xs4 md2 class="pt-10">
          <v-btn
            :loading="loading"
            :disabled="!isValid"
            x-large
            block
            color="primary"
            @click="submit"
          > 
          Next
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import { db } from "../db.js";

const eventsDb = db.collection("events");
export default {
  components: {
  },
  data: () => ({
    loading: false,
    isValid: false,
    eventName: '',
      eventNameRules: [
        v => !!v || 'Event name is required',
        v => (v && v.length <= 40) || 'Event name must be less than 40 characters',
      ],
    email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    dateDialog: false,
    date: null,
    time: null,
    location: null
  }),
  created() {
  },
  methods: {
    // when the user clicks the Next button
    async submit() {
      this.loading = true;
      // TODO: send data here & make sure it saves!
      let eventCreate = await eventsDb.add({
        name: this.eventName,
        date: this.date,
        time: this.time,
        location: this.location
      })
      let newEventId = eventCreate._key.path.segments[1]
      this.$router.push("/register?eventId=" + newEventId);
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
