<template>
  <div class="navigate-container container">
    <h2>Navigate</h2>
    <form>
      <fieldset>
        <label for="geo_go_to">Go to</label>
        <input
          id="geo_go_to"
          v-model="location"
          placeholder="200 St Kilda Road, Melbourne"
          type="text"
          name="geo_go_to"
          @keyup="handleKeyUp"
        />
      </fieldset>
    </form>
    <h3 v-if="locations.length">Suggestions for '{{location}}'</h3>
    <div v-if="locations.length" class="geo-suggestions">
      <div v-for="loc in locations" :key="loc.name" class="row">
        <a href="#" class="suggestion column" @click.stop.prevent="navigateTo(loc.center)">{{ loc.name }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import debounce from 'lodash.debounce'

export default Vue.extend({
  props: {
    geocodeFn: Function
  },
  data() {
    return {
      location: '',
    }
  },
  computed: mapState({
    locations: (state: any) => state.geocodeSuggestions
  }),
  created () {
    this.geolocate = debounce(this.geolocate, 300, { leading: false, trailing: true })
  },
  methods: {
    handleKeyUp() {
      this.geolocate()
    },
    geolocate () {
      this.geocodeFn(this.location)
    },
    navigateTo (center: any) {
      this.$emit('navigate', center)
    }
  }
})
</script>
