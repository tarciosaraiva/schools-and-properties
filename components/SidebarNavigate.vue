<template>
  <div class="navigate-container">
    <fieldset>
      <legend>Navigate</legend>
      <div class="input-group vertical">
        <label for="geo_go_to" style="display:none">Go to location</label>
        <input
          id="geo_go_to"
          v-model="location"
          placeholder="200 St Kilda Road, Melbourne"
          type="text"
          name="geo_go_to"
          autocomplete="false"
          @keyup="handleKeyUp"
        />
      </div>
      <p v-if="locations.length">Locations found for '{{location}}'</p>
      <div v-if="locations.length" class="geo-suggestions">
        <div v-for="loc in locations" :key="loc.name" class="row">
          <a href="#" class="suggestion column" @click.stop.prevent="navigateTo(loc.center, loc.placeType)">{{ loc.name }}</a>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import debounce from 'lodash.debounce'

export default Vue.extend({
  props: {
    geocodeFn: {
      type: Function,
      default: () => () => {}
    }
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
    navigateTo (center: number[], placeType: string[]) {
      this.$emit('navigate', center, placeType)
    }
  }
})
</script>
