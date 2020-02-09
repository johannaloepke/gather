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
              <p
                color="gray"
                v-show="form.isEating"
                class="text-left mt-5"
              >My dietary restrictions include:</p>

              <v-combobox
                class="mb-5"
                v-show="form.isEating"
                v-model="form.dietaryRestrictionsModel"
                chips
                append-icon
                clearable
                multiple
                solo
                flat
                outlined
                dense
                background-color="transparent"
                height="80"
              >
                <template v-slot:selection="{ attrs, item, select, selected }">
                  <v-chip
                    color="gray"
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    clearable
                  >
                    {{ item }}
                  </v-chip>
                </template>
              </v-combobox>
                

              <!-- Allergies/Intolerances (shown if eating is toggled) -->
              <p v-show="form.isEating" class="text-left">My allergies or intolerances include:</p>

              <v-combobox
                class="mb-5"
                v-show="form.isEating"
                v-model="form.allergyModel"
                chips
                append-icon
                clearable
                multiple
                solo
                flat
                outlined
                dense
                background-color="transparent"
                height="80"
              >
                <template v-slot:selection="{ attrs, item, select, selected }">
                  <v-chip
                    color="gray"
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    clearable
                  >
                    {{ item }}
                  </v-chip>
                </template>
              </v-combobox>

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
export default {
  components: {},
  data: () => ({
    loading: false,
    formValid: false,
    form: {
      isEating: false,
      isDrinking: false,
      userName: "",
      email: "",
      pronouns: "",
      allergyModel: [],
      dietaryRestrictionsModel: [],
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

  watch: {
    model(val, prev) {
      if (val.length === prev.length) return;
      this.model = val.map(v => {
        if (typeof v === "string") {
          v = {
            text: v,
            color: this.colors[this.nonce - 1]
          };
          this.items.push(v);
          this.nonce++;
        }
        return v;
      });
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
    
    submit() {
      this.loading = true;
      // TODO: send data here & make sure it saves!
      this.$router.push("/add-request");
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
