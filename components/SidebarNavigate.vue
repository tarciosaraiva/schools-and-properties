<template>
  <div class="container">
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
    <div v-if="locations.length" class="results">
      <div v-for="location in locations" :key="location.name" class="row">
        <a href="#" class="column" @click.stop.prevent="navigateTo(location.center)">{{ location.name }}</a>
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
