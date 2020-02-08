<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <h1 class="display-1 font-weight-bold mt-3 pa-5">
          Let's get started 🎉
        </h1>

        <v-layout justify-center>
          <v-flex lg4 md6 xs8>
            <!-- Event Name -->
            <v-text-field
              label="Event name"
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
              class="pt-7"
              label="Time (optional)"
            ></v-text-field>

            <!-- Address -->
            <v-text-field
              class="pt-7"
              label="Address (optional)"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
      
      <v-layout justify-center>
        <v-flex xs4 md2 class="pt-10">
          <v-btn
            :loading="loading"
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
  </v-container>
</template>

<script>

export default {
  components: {
  },
  data: () => ({
    loading: false,
    dateDialog: false,
    date: new Date().toISOString().substr(0, 10),
  }),
  created() {
  },
  methods: {
    // when the user clicks the Next button
    submit() {
      this.loading = true;
      // TODO: send data here & make sure it saves!
      this.$router.push("/register");
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
