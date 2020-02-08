<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <h1 class="display-1 font-weight-bold mt-3 pa-5">
          Welcome!
        </h1>

        <v-layout justify-center>
          <v-flex lg4 md6 xs8>
            <!-- User Name -->
            <v-text-field
              label="Your name"
            ></v-text-field>
            
            <!-- Pronouns -->
            <v-text-field
              class="pt-7"
              label="Pronouns (optional)"
            ></v-text-field>

            <!-- Planning on Eating? -->
             <v-switch class="pt-5" v-model="isEating" label="I plan to eat at the event."></v-switch>
            
            <!-- Dietary Restrictions (shown if eating is toggled) -->
            <p color="gray" v-show="isEating" class="text-left mt-5">My dietary restrictions include:</p>

            <!-- TODO : add chip categories -->
            <v-col cols="12" sm="6">
              <v-select
              v-show="isEating"
              v-model="value"
              :items="items"
              chips
              label="None"
              multiple
              outlined
              ></v-select>
            </v-col>

            <!-- Allergies/Intolerances (shown if eating is toggled) -->
            <p v-show="isEating" class="text-left">My allergies or intolerances include:</p>

            <!-- TODO : add chip categories -->
            <v-col cols="12" sm="6">
              <v-select
              v-show="isEating"
              v-model="value"
              :items="items"
              chips
              label="None"
              multiple
              outlined
              ></v-select>
            </v-col>

            <!-- Planning on Drinking? (toggle) -->
            <v-switch v-model="drinkSwitch" label="I plan to drink alcohol at the event."></v-switch>
        
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
    isEating: false
  }),
  created() {
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
  font-family: 'Amatic SC';
}
</style>
