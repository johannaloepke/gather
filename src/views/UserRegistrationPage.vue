<template>
  <v-container>
    <v-form ref="form" v-model="formValid">
      <v-layout text-center wrap>
        <v-flex xs12>
          <h1 class="display-1 mt-3 pa-4">First, the small talk...</h1>
          <p class="nmt-7">Tell me a bit about yourself! 👋🏾</p>

          <v-layout justify-center>
            <v-flex lg4 md6 xs8>
              <!-- User Name -->
              <v-text-field
                v-model.lazy="form.userName"
                :rules="userNameRules"
                :counter="30"
                label="Your name"
                required
              ></v-text-field>

              <!-- Email -->
              <v-text-field v-model.lazy="form.email" :rules="emailRules" label="E-mail" required></v-text-field>

              <!-- Pronouns -->
              <v-text-field v-model.lazy="form.pronouns" class="pt-7" label="Pronouns (optional)"></v-text-field>

              <!-- Planning on Eating? -->
              <v-switch
                class="pt-5"
                v-model.lazy="form.isEating"
                label="I plan to eat at this event."
              ></v-switch>

              <!-- Dietary Restrictions (shown if eating is toggled) -->
              <chip-container
                title="My dietary restrictions include:"
                :show="form.isEating"
                :value="form.dietaryRestrictions"
                @input="(newDietaryRestrictions) => {form.dietaryRestrictions = newDietaryRestrictions}"
              />   

              <!-- Allergies/Intolerances (shown if eating is toggled) -->
              <chip-container
                title="My allergies or intolerances include:"
                :show="form.isEating"
                :value="form.allergies"
                @input="(newAllergies) => {form.allergies = newAllergies}"
              />

              <!-- Planning on Drinking? (toggle) -->
              <v-switch
                v-model.lazy="form.isDrinking"
                label="I plan to drink alcohol at this event."
              ></v-switch>
            </v-flex>
          </v-layout>
        </v-flex>

        <!-- Next Button -->
        <v-layout justify-center>
          <v-flex xs4 md2 class="pt-10">
            <v-btn
              :loading="loading"
              :disabled="!formValid"
              x-large
              block
              color="primary"
              @click="submit"
            >Next</v-btn>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import { db } from "../db.js";
import * as firebase from 'firebase/app';
import ChipContainer from '../components/ChipContainer.vue'

const eventsDb = db.collection("events");
const usersDb = db.collection("users");
export default {
	components: { ChipContainer },
  data: () => ({
    loading: false,
    formValid: false,
    form: {
      isEating: false,
      isDrinking: false,
      userName: "",
      email: "",
      pronouns: "",
      allergies: [],
      dietaryRestrictions: [],
    },
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    userNameRules: [
      v => !!v || "Your name is required",
      v => (v && v.length <= 30) || "Your name must be less than 30 characters"
    ],
  }),
  computed: {
    eventId() {
      return this.$route.query.eventId
    }
  },

  created() {},
  methods: {
    addDietaryRestriction(item) {
      this.form.dietaryRestrictions.push(item);
    },
    addAllergy(item) {
      this.form.allergies.push(item);
    },
    
    async submit() {
      this.loading = true;
      let userCreate = await usersDb.add({
        name: this.form.userName,
        email: this.form.email,
        pronouns: this.form.pronouns,
        isDrinkingAlcohol: this.form.isDrinking,
        isEating: this.form.isEating,
        allergies: this.form.allergies,
        dietaryRestrictions: this.form.dietaryRestrictions
      })
      let newUserId = userCreate._key.path.segments[1]
      console.log(db.doc(newUserId))
      eventsDb.doc(this.eventId).update({ Users: firebase.firestore.FieldValue.arrayUnion(db.doc(newUserId).ref)})
      // TODO: send data here & make sure it saves!
      //this.$router.push("/add-request");
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
  font-family: "Amatic SC";
}
</style>
