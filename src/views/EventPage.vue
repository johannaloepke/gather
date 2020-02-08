<template>
  <v-container>
    <v-layout text-center wrap>
      <sidebar :userName="currentUser.userName" :pronouns="currentUser.pronouns" />
      <v-flex xs12>
        <h1 class="display-1 font-weight-bold mt-3">{{ name }}</h1>
        <h2 class="font-weight-bold">{{ date }}, {{ time }}</h2>
        <h2 class="font-weight-bold">{{ location }}</h2>
      </v-flex>

      <h2 class="font-weight-bold">{{ requests }}</h2>

      <h2 class="font-weight-bold">{{ items }}</h2>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from "../db.js";
import Sidebar from "../components/Sidebar.vue";

const events = db.collection("events");
export default {
  props: {
    id: String
  },
  components: {
    Sidebar
  },
  data: () => ({
    loading: false,
    eventDetails: {},
    currentUser: { userName: "Johanna", pronouns: "she/her/hers" }
  }),
  computed: {
    name() {
      return this.eventDetails.name;
    },
    date() {
      let date = this.eventDetails.date;
      if (date) {
        date = date
          .toDate()
          .toString()
          .split(":")[0]
          .slice(0, -3);
      }
      return date;
    },
    time() {
      return this.eventDetails.time;
    },
    location() {
      return this.eventDetails.location;
    },
    expectedGuests() {
        return this.eventDetails.expectedGuests
    },
    actualGuests() {
        return this.eventDetails.actualGuests
    },
    requests() {
      return this.eventDetails.Requests;
    },
    users() {
      return this.eventDetails.Users;
    },
    items() {
      return this.users.map(user => user.Items).flat();
    },
    fulfilledRequests() {
      return this.requests.filter(request => request.fulfilled);
    },
    unfulfilledRequests() {
      return this.requests.filter(request => !request.fulfilled);
    }
  },
  created() {},
  watch: {
    id: {
      handler(id) {
        this.$bind("eventDetails", events.doc(id)).then(eventDetails => {
          // allows real-time updates from database
          this.eventDetails === eventDetails;
        });
      },
      deep: true,
      immediate: true // call it upon creation too
    }
  },
  methods: {
    submit() {}
  },
  beforeDestroy() {
    // Teardown leaky properties https://alligator.io/vuejs/component-lifecycle/
  }
};
</script>

<style scoped>
.v-btn {
  font-size: 1.5em;
}
h1 {
  font-family: "Amatic SC", cursive;
}
</style>
