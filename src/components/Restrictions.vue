<template>
    <v-layout justify-center>
    <v-flex xs10>
      <v-chip-group
        v-model="restrictionsSelected"
        multiple
        column
        active-class="primary--text"
      >
        <v-chip
          large
          v-for="restriction in restrictions" 
          :key="restriction"
        >
          {{ restriction }}
        </v-chip>
      </v-chip-group>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
    data: () => ({
      restrictions: [
        'soy',
        'peanut',
      ],
      restrictionsSelected: []
  }),
  watch: {
    // Let the parent know which restrictions are currently selected
    restrictionsSelected(selected) {
      let restrictionNames = [];
      for (let index of selected) {
        retrictionNames.push(this.restrictions[index]);
      }
      this.$emit('restriction_selected', restrictionNames);
    }
  },
  beforeDestroy () {
    delete this.restrictions;
  }
};
</script>
