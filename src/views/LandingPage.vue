<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <h1 class="display-2 font-weight-bold mt-3 pa-1 pt-5">
          Where the party at? 🎉
        </h1>
      </v-flex>
      
      <v-layout justify-center>
        <v-flex xs10 md4>
          <v-spacer></v-spacer>
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
    loading: false
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
