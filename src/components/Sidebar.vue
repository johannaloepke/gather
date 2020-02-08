 <template>
  <v-container>
    <v-navigation-drawer
      v-model="drawer"
      :color="color"
      :expand-on-hover="expandOnHover"
      :right="right"
      absolute
      permanent
      dark
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line class="px-0">
          <v-list-item-avatar>
            <img src="https://picsum.photos/300/300" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ userName }}</v-list-item-title>
            <v-list-item-subtitle>{{ pronouns }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>
    
<script>
export default {
  props: {
    userName: String,
    pronouns: String
  },
  data() {
    return {
      drawer: true,
      items: [
        { title: "Items So Far", icon: "mdi-basket" },
        { title: "People Going", icon: "mdi-account-group" },
        { title: "Diets/Allergies", icon: "mdi-peanut-off" }
      ],
      color: "primary",
      colors: ["primary", "blue", "success", "red", "teal"],
      right: true,
      expandOnHover: true
    };
  }
  // created() {
  //   this.$http.get('https://dog.ceo/api/breed/bulldog/french/images/random').then(function(response) {
  //     this.avatarURL = response.data.message;
  //   })
  // },
};
</script>
    