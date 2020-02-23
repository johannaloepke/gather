<template>
  <v-container>
    <v-form ref="form" v-model="formValid">
      <v-layout text-center wrap>
        <v-flex xs12>
          <!-- Header -->
          <h1 class="display-1 mt-3 pa-5">✋🏾 Dibs!</h1>

          <p color="gray" class="text-center font-weight-bold body-1 mt-5">I'm bringing:</p>

          <!-- Ask for item name -->
          <v-layout justify-center>
            <v-flex lg6 md6 xs8>
              <v-row>
                <template :selection="{ attrs, item, select, selected }">
                  <v-text-field v-model.lazy="itemName" :counter="30" label="Item name" clearable></v-text-field>

                  <!-- Ask for servings -->
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

          <v-layout justify-center>
          <v-flex lg10 xs8>
          <!-- Ask for ingredients list -->
          <p color="gray" class="text-center font-weight-bold body-1 mt-6">Does it contain any allergens?</p>
                
            <p class="text-left">Type key allergens + press enter:</p>

              <v-combobox
                class="mb-5"
                v-model="allergyModel"
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
                    clearable
                    close
                  >
                    {{ item }}
                  </v-chip>
                </template>
              </v-combobox>
          </v-flex>
          </v-layout>

          <!-- Prompt for dietary restrictions tags -->

          <!-- Prompt for allergen tags -->

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
    dietaryRestrictionsModel: [],
    allergyModel: [],
    people: "",
    peopleRules: [
      v => !!v || "Expected number of people is required",
      v => Number.isInteger(v) || "Number of people must be a number"
    ],
    itemRequests: []
  }),
  created() {},
  methods: {
    addItem() {
      this.items.push({
        value: ""
      });
    },
    mounted() {
      this.addItem();
    },
    submit() {
      this.loading = true;
      // TODO: send data here & make sure it saves!
      this.$router.push("/events/po1d1suiYkudPEQd5hj4");
    },
    beforeDestroy() {
      // Teardown leaky properties https://alligator.io/vuejs/component-lifecycle/
    }
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

 