<template>
  <v-container>
    <v-layout text-center wrap>
      <!-- <sidebar :userName="currentUser.userName" :pronouns="currentUser.pronouns" class="ml-5" /> -->

      <v-flex xs1 class="ml-5 mb-5 mt-8">
        <v-chip large>{{ actualGuests+' / '+expectedGuests }}</v-chip>
        <p>guests responded</p>
      </v-flex>
      <v-flex xs10 class="ml-n5 mb-5 mt-5">
        <h1 class="display-1 font-weight-bold mt-3">{{ name }}</h1>
        <h2 class="font-weight-bold">{{ date }}, {{ time }}</h2>
        <h2 class="font-weight-bold">{{ location }}</h2>
      </v-flex>

      <v-flex xs7>
        <v-card class="ma-5 pa-3">
          <v-list two-line>
            <h3>Requested Items</h3>
            <v-list-item v-for="request in unfulfilledRequests" :key="request.name">
                <!-- TODO bug where more items flash -->
              <!-- @mouseenter="hover=true"
              @mouseleave="hover=false">-->
              <v-list-item-avatar>
                <v-img :src="emojify(request.name)"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="request.name"></v-list-item-title>
                <v-list-item-subtitle v-text="'Serves '+request.serves+' people'"></v-list-item-subtitle>
              </v-list-item-content>

              <v-btn rounded color="success" @click="signUp">Sign up</v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>

      <v-col>
        <v-flex xs12>
          <v-card class="ml-4 ma-5 pa-3">
            <v-list two-line>
              <h3>Already Gathered</h3>
              <v-list-item v-for="request in fulfilledRequests" :key="request.name">
                <v-list-item-avatar>
                  <v-img :src="emojify(request.Item.name)"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="request.Item.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="'Serves '+request.Item.serves+' people'"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-flex>

        <v-flex xs12>
          <v-card class="ma-4 pa-3">
            <!-- <v-toolbar flat color="error accent-4" dark>
            <v-toolbar-title>Allergens & Dietary Restrictions</v-toolbar-title>
            </v-toolbar>-->

            <v-card-text>
              <h2 class="title mb-2">Allergies</h2>
              <v-chip-group column multiple>
                <div v-for="allergy in allergies" :key="allergy">
                  <v-chip
                    class="v-chip--active"
                    color="error"
                    text-color="white"
                    v-if="allergy[1] > 1"
                  >
                  {{ allergy[0] }} x{{ allergy[1] }}
                  </v-chip>
                  <v-chip class="v-chip--active" color="error" text-color="white" v-else>{{ allergy[0] }}</v-chip>
                </div>
              </v-chip-group>
            </v-card-text>

            <v-card-text>
              <h2 class="title mb-2">Dietary Restrictions</h2>
              <v-chip-group column>
                <div v-for="diet in diets" :key="diet">
                  <v-chip
                  class="v-chip--active"
                    color="blue"
                    text-color="white"
                    v-if="diet[1] > 1"
                  >{{ diet[0] }} x{{ diet[1] }}</v-chip>
                  <v-chip class="v-chip--active" color="blue" text-color="white" v-else>{{ diet[0] }}</v-chip>
                </div>
              </v-chip-group>
            </v-card-text>

            <v-card-text>
              <h2 class="title mb-2"># of Alcohol Drinkers</h2>
              <p>{{ numAlcohol }}</p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-col>
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
  components: { Sidebar },
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
      return this.eventDetails.expectedGuests;
    },
    actualGuests() {
      return this.eventDetails.actualGuests;
    },
    requests() {
      return this.eventDetails.Requests;
    },
    fulfilledRequests() {
      return this.requests
        ? this.requests.filter(request => request.fulfilled)
        : [];
    },
    unfulfilledRequests() {
      return this.requests
        ? this.requests.filter(request => !request.fulfilled)
        : [];
    },
    users() {
      return this.eventDetails.Users;
    },
    allergies() {
      let masterList = {};
      const allAllergies = this.users
        ? this.users
            .map(user => user.allergies)
            .flat()
            .filter(allergy => !["", null, undefined].includes(allergy))
        : [];
      for (const a of allAllergies) {
        if (masterList[a]) {
          masterList[a] = masterList[a] + 1;
        } else {
          masterList[a] = 1;
        }
      }
      return Object.keys(masterList).map(key => [key, masterList[key]]);
    },
    diets() {
      let masterList = {};
      const allDiets = this.users
        ? this.users
            .map(user => user.dietaryRestrictions)
            .flat()
            .filter(diet => !["", null, undefined].includes(diet))
        : [];
      for (const d of allDiets) {
        if (masterList[d]) {
          masterList[d] = masterList[d] + 1;
        } else {
          masterList[d] = 1;
        }
      }
      return Object.keys(masterList).map(key => [key, masterList[key]]);
    },
    items() {
      return this.users ? this.users.map(user => user.Items).flat() : [];
    },
    numAlcohol() {
      return this.users
        ? this.users.filter(user => user.isDrinkingAlcohol).length
        : 0;
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
        if (text && text.includes(food[0])) {
          return (
            "https://xn--i-7iq.ws/emoji-image/" +
            food[1] +
            ".png?format=emojione&ar=2x1"
          );
        }
      }
      return "https://xn--i-7iq.ws/emoji-image/🍽.png?format=emojione&ar=2x1"; // No valid food emoji was found
    },
    signUp() {
        this.$router.push("/add-item")
    }
    // async openModal(item) {
    //     const user = await this.getUserById(request.Item.User.split('/')[1])
    //     console.log(user)
    //     return request.Item.name+' - '+user.name+' ('+user.pronouns+')'
    // },
    // getUserById(id) {
    //     usersDB.doc(id).get().then(function(stuff) {
    //         return stuff.data()
    //     });
    // },
    // async itemTitle(request) {
    //     const user = await this.getUserById(request.Item.User.split('/')[1])
    //     console.log(user)
    //     return request.Item.name+' - '+user.name+' ('+user.pronouns+')'
    // }
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
</style>
