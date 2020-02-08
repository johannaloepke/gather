<template>
  <v-container>
    <v-form ref="form" v-model="formValid">
      <v-layout text-center wrap>
        <v-flex xs12>
          <h1 class="display-1 font-weight-bold mt-3 pa-5">Let's build a list.</h1>
          <!-- How many people are you expecting at the gathering? -->
          <!-- Item Name, Servings -->

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
    
    itemRequests: [],
    
    submit() {}
  }),
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
