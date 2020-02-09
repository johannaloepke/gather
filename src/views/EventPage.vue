<template>
  <v-container>
    <v-layout text-center wrap>
      <!-- <sidebar :userName="currentUser.userName" :pronouns="currentUser.pronouns" class="ml-5" /> -->
      <v-flex xs12>
        <h1 class="display-1 font-weight-bold mt-3">{{ name }}</h1>
        <h2 class="font-weight-bold">{{ date }}, {{ time }}</h2>
        <h2 class="font-weight-bold">{{ location }}</h2>
      </v-flex>

      <v-flex xs7>
        <v-card class="mt-8">
          <v-list two-line>
            <h3>Requested Items</h3>
            <v-list-item
              v-for="request in requests"
              :key="request.name"
              @click=""
              @mouseenter="hover=true"
              @mouseleave="hover=false"
            >
              <v-list-item-avatar>
                <v-img :src="emojify(request.name)"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="request.name"></v-list-item-title>
                <v-list-item-subtitle v-text="'Serves '+request.serves+' people'"></v-list-item-subtitle>
              </v-list-item-content>

              <v-btn rounded v-show="hover">Sign up</v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>

      <v-flex xs5>
        <v-card class="ml-4 mt-8">
          <v-list two-line>
            <h3>Already Gathered</h3>
            <v-list-item
              v-for="request in fulfilledRequests"
              :key="request.name"
              @click="print(getUserById(request.Item.User))"
            >
              <v-list-item-avatar>
                <v-img :src="emojify(request.Item.name)"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="itemTitle(request)"></v-list-item-title>
                <v-list-item-subtitle v-text="'Serves '+request.Item.serves+' people'"></v-list-item-subtitle>
              </v-list-item-content>

            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>

      <h2 class="font-weight-bold">{{ requests }}</h2>

      <h2 class="font-weight-bold">{{ items }}</h2>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from "../db.js";
import { foodToEmoji } from "../assets/emojis.js";
import Sidebar from "../components/Sidebar.vue";

const events = db.collection("events");
const usersDB = db.collection("users");
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
    currentUser: { userName: "Johanna", pronouns: "she/her/hers" },
    hover: false
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
      return this.eventDetails.expectedGuests;
    },
    actualGuests() {
      return this.eventDetails.actualGuests;
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
    emojify(text) {
      for (const food of foodToEmoji) {
        // 0 is keyword, 1 is emoji
        if (text.includes(food[0])) {
          return (
            "https://xn--i-7iq.ws/emoji-image/" +
            food[1] +
            ".png?format=emojione&ar=2x1"
          );
        }
      }
      return "https://xn--i-7iq.ws/emoji-image/🍽.png?format=emojione&ar=2x1"; // No valid food emoji was found
    },
    print(stuff) {
        console.log(stuff)
    },
    async getUserById(id) {
        await usersDB.doc(id).get().then(function(stuff) {
            console.log(stuff.data())
            return stuff.data()
        });
    },
    async itemTitle(request) {
        const user = await this.getUserById(request.Item.User.split('/')[1])
        return request.Item.name+' - '+user.name+' ('+user.pronouns+')'
    }
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
