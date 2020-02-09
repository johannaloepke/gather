<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>
        <span class="font-weight-bold display-1">gather</span>
       
        <span
          v-show="$vuetify.breakpoint.smAndUp"
          class="font-weight-light ml-4"
          v-text="'for better get-togethers'"
        />        
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        href="https://github.com/johannaloepke/gather/"
        target="_blank"
      >
        <span class="mr-2">Source Code</span>
      </v-btn>
    </v-app-bar>

    <!-- This is the view that will render the component specified in router.js -->
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    //
  }),
};
</script>
<style scoped>
.gather-font {
  font-family: 'Amatic SC', cursive;
  font-size: 1em
}
</style>

