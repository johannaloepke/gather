<template>
  <v-container>
    <v-form
    ref="form"
    v-model="formValid"
    >
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
              v-model.lazy="form.userName"
              :rules="userNameRules"
              :counter="30"
              label="Your name"
              required
            ></v-text-field>
            
            <!-- Pronouns -->
            <v-text-field
              v-model.lazy="form.pronouns"
              class="pt-7"
              label="Pronouns (optional)"
            ></v-text-field>

            <!-- Planning on Eating? -->
             <v-switch class="pt-5" v-model.lazy="form.isEating" label="I plan to eat at the event."></v-switch>
            
            <!-- Dietary Restrictions (shown if eating is toggled) -->
            <p color="gray" v-show="form.isEating" class="text-left mt-5">My dietary restrictions include:</p>

            <v-combobox
              v-show="form.isEating"
              v-model="form.dietaryRestrictions"
              :filter="filter"
              :hide-no-data="!search"
              :items="dietaryItems"
              :search-input.sync="search"
              hide-selected
              label="None"
              multiple
              chips
              outlined
            >
              <template v-slot:no-data>
                <v-list-item>
                  <span class="subheading">Create</span>
                  <v-chip
                    :color="`${colors[nonce - 1]} lighten-3`"
                    label
                    small
                  >
                    {{ search }}
                  </v-chip>
                </v-list-item>
              </template>
              <template v-slot:selection="{ attrs, item, parent, selected }">
                <v-chip
                  v-if="item === Object(item)"
                  v-bind="attrs"
                  :color="`${item.color} lighten-3`"
                  :input-value="selected"
                  label
                  small
                >
                  <span class="pr-2">
                    {{ item.text }}
                  </span>
                  <v-icon
                    small
                    @click="parent.selectItem(item)"
                  >close</v-icon>
                </v-chip>
              </template>
              <template v-slot:item="{ index, item }">
                <v-text-field
                  v-if="editing === item"
                  v-model="editing.text"
                  autofocus
                  flat
                  background-color="transparent"
                  hide-details
                  solo
                  @keyup.enter="edit(index, item)"
                ></v-text-field>
                <v-chip
                  v-else
                  :color="`${item.color} lighten-3`"
                  dark
                  label
                  small
                >
                  {{ item.text }}
                </v-chip>
                <v-spacer></v-spacer>
                <v-list-item-action @click.stop>
                  <v-btn
                    icon
                    @click.stop.prevent="edit(index, item)"
                  >
                    <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-combobox>
                    
            <!-- Allergies/Intolerances (shown if eating is toggled) -->
            <p v-show="form.isEating" class="text-left">My allergies or intolerances include:</p>

            <v-combobox
              class="pb-5"
              v-show="form.isEating"
              v-model="form.allergies"
              :filter="filter"
              :hide-no-data="!search"
              :items="allergies"
              :search-input.sync="search"
              hide-selected
              label="None"
              multiple
              chips
              outlined
            >
              <template v-slot:no-data>
                <v-list-item>
                  <span class="subheading">Create</span>
                  <v-chip
                    :color="`${colors[nonce - 1]} lighten-3`"
                    label
                    small
                  >
                    {{ search }}
                  </v-chip>
                </v-list-item>
              </template>
              <template v-slot:selection="{ attrs, item, parent, selected }">
                <v-chip
                  v-if="item === Object(item)"
                  v-bind="attrs"
                  :color="`${item.color} lighten-3`"
                  :input-value="selected"
                  label
                  small
                >
                  <span class="pr-2">
                    {{ item.text }}
                  </span>
                  <v-icon
                    small
                    @click="parent.selectItem(item)"
                  >close</v-icon>
                </v-chip>
              </template>
              <template v-slot:item="{ index, item }">
                <v-text-field
                  v-if="editing === item"
                  v-model="editing.text"
                  autofocus
                  flat
                  background-color="transparent"
                  hide-details
                  solo
                  @keyup.enter="edit(index, item)"
                ></v-text-field>
                <v-chip
                  v-else
                  :color="`${item.color} lighten-3`"
                  dark
                  label
                  small
                >
                  {{ item.text }}
                </v-chip>
                <v-spacer></v-spacer>
                <v-list-item-action @click.stop>
                  <v-btn
                    icon
                    @click.stop.prevent="edit(index, item)"
                  >
                    <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-combobox>

            <!-- Planning on Drinking? (toggle) -->
            <v-switch class="mt-n5" v-model.lazy="form.isDrinking" label="I plan to drink alcohol at the event."></v-switch>
        
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
          > 
          Next
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
    </v-form>
  </v-container>
</template>

<script>

export default {
  components: {
  },
  data: () => ({
    loading: false, 
    formValid: false,
    form: {
      isEating: false,
      isDrinking: false,
      userName: '',
      dietaryRestrictions: [],
      pronouns: '',
      allergies: [],
    },
      userNameRules: [
        v => !!v || 'Your name is required',
        v => (v && v.length <= 30) || 'Your name must be less than 30 characters',
      ],
      activator: null,
      attach: null,
      colors: ['gray'],
      editing: null,
      index: -1,
      dietaryItems: [
        { header: 'Select an option or type in box to create one' },
        {
          text: 'vegetarian',
          color: 'gray',
        },
        {
          text: 'vegan',
          color: 'gray',
        },
        {
          text: 'keto',
          color: 'gray',
        },
        {
          text: 'paleo',
          color: 'gray',
        },
        {
          text: 'kosher',
          color: 'gray',
        },
        {
          text: 'halal',
          color: 'gray',
        },
      ],
      allergies: [
        { header: 'Select an option or type in box to create one' },
        {
          text: 'gluten',
          color: 'gray',
        },
        {
          text: 'wheat',
          color: 'gray',
        },
        {
          text: 'eggs',
          color: 'gray',
        },
        {
          text: 'dairy',
          color: 'gray',
        },
        {
          text: 'tree nuts',
          color: 'gray',
        },
        {
          text: 'soy',
          color: 'gray',
        },
      ],
      nonce: 1,
      menu: false,
      model: [],
      x: 0,
      search: null,
      y: 0,
  }),

  watch: {
      model (val, prev) {
        if (val.length === prev.length) return
        this.model = val.map(v => {
          if (typeof v === 'string') {
            v = {
              text: v,
              color: this.colors[this.nonce - 1],
            }
            this.items.push(v)
            this.nonce++
          }
          return v
        })
      },
    },

  created() {
  },
  methods: {
    edit (index, item) {
        if (!this.editing) {
          this.editing = item
          this.index = index
        } else {
          this.editing = null
          this.index = -1
        }
      },
      filter (item, queryText, itemText) {
        if (item.header) return false
        const hasValue = val => val != null ? val : ''
        const text = hasValue(itemText)
        const query = hasValue(queryText)
        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      },
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
