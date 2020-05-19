<template>
  <v-container>
    <v-form ref="form" v-model="formValid">
      <v-layout text-center wrap>
        <v-flex xs12>
          <h1 class="display-1 mt-3 pa-5">Well hello, party planner! 💫</h1>

          <!-- People attending -->
          <p
            color="gray"
            class="text-center mt-5"
          >How many people are you expecting at this shindig?</p>
          <v-layout justify-center text-center>
            <v-flex lg1 md2 xs2 align-center justify-center>
              <v-text-field
                align="center"
                class="centered-input"
                v-model.number="people"
                :rules="peopleRules"
                label="Estimate"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>

          <!-- Item Name, Servings -->

          <p color="gray" class="text-center mt-5">What would you like them to bring?</p>

          <v-layout justify-center>
            <v-flex lg6 md6 xs8>
              <v-row>
                <v-btn
                  class="mt-5 mr-3"
                  dense
                  :loading="loading"
                  :disabled="!servings"
                  @click="addItem"
                >
                  <v-icon>add_circle_outline</v-icon>
                </v-btn>

                <template :selection="{ attrs, item, select, selected }">
                  <v-text-field v-model.lazy="itemName" :counter="30" label="Item name" clearable></v-text-field>
                  <v-flex lg4 md3 xs3>
                    <v-text-field 
                    v-bind="attrs"
                    :input-value="selected"
                    class="pl-5" 
                    v-model.number="servings" 
                    label="Servings" 
                    clearable
                    ></v-text-field>
                  </v-flex>
                </template>
              </v-row>
            </v-flex>
          </v-layout>

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
        </v-flex>
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
    estimate: "",
    itemName: "",
    servings: "",
    people: "",
    peopleRules: [
      v => !!v || "Expected number of people is required",
      v => Number.isInteger(v) || "Number of people must be a number"
    ],
    itemRequests: [],

    items: [{
        name: null,
        servings: null
    }],
  }),
  created() {},
  methods: {
    addItem() {
      this.itemRequests.push({
        value: ""
      });
    },
    mounted() {
      this.addItem();
    },
    submit() {
      // TODO: send data here & make sure it saves!
      this.$router.push("/events/H0fah67TAZPsXxCMoIHx");
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
