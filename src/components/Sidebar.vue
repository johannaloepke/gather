 <template>
  <v-container>
      <v-navigation-drawer
        v-model="drawer"
        :color="color"
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :right="right"
        absolute
        dark
      >
        <v-list dense nav class="py-0">
          <v-list-item two-line :class="miniVariant && 'px-0'">
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
      pronouns: String,
    },
    data() {
      return {
        drawer: true,
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        color: 'primary',
        colors: [
          'primary',
          'blue',
          'success',
          'red',
          'teal',
        ],
        right: true,
        miniVariant: false,
        expandOnHover: false,
      }    
    },
    // created() {
    //   this.$http.get('https://dog.ceo/api/breed/bulldog/french/images/random').then(function(response) {
    //     this.avatarURL = response.data.message;
    //   })
    // },
  }
</script>
    