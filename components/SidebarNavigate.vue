<template>
  <div class="container">
    <h2>Navigate</h2>
    <form>
      <fieldset>
        <label for="geo_go_to">Go to</label>
        <input
          placeholder="200 St Kilda Road, Melbourne"
          type="text"
          name="geo_go_to"
          id="geo_go_to"
          v-model="location"
          @keyup="handleKeyUp"
        />
      </fieldset>
    </form>
    <h3 v-if="locations.length">Suggestions for '{{location}}'</h3>
    <div class="results" v-if="locations.length">
      <div class="row" v-for="location in locations" :key="location.name">
        <a href="#" @click.stop.prevent="navigateTo(location.center)" class="column">{{ location.name }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import debounce from 'lodash.debounce'

export default Vue.extend({
  props: ['geocodeFn'],
  data() {
    return {
      location: '',
    }
  },
  computed: mapState({
    locations: (state: any) => state.geocodeSuggestions
  }),
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
  },
  created () {
    this.geolocate = debounce(this.geolocate, 300, { leading: false, trailing: true })
  }
})
</script>

<style>
.sidebar form {
  margin-bottom: 0;
}

.sidebar .container {
  margin-bottom: 2rem;
}

.results {
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 90%;
  height: 100%;
  max-height: 20rem;
  overflow-y: auto;
  overflow-x: hidden;
}

.results .row span.column {
  display: block;
  padding: 0.25rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 30rem;
}
</style>
