<template>
  <div class="popup-info container">
    <div class="row">
      <div class="column">
        <vue-flux
          :options="vfOptions"
          :images="property.media"
          :transitions="vfTransitions"
          style="width:380px"
        >
          <template v-slot:preloader>
            <flux-preloader />
          </template>
          <template v-slot:controls>
            <flux-index />
          </template>
        </vue-flux>
      </div>
    </div>
    <div class="row property">
      <span class="column price">{{ property.price }}</span>
    </div>
    <div class="row property">
      <p class="column address">
        <em>{{ property.displayableAddress }}</em>
      </p>
    </div>
    <div class="row property" v-if="property.features">
      <ul class="column">
        <li v-for="f in property.features" :key="f">
          {{ f }}
        </li>
      </ul>
    </div>
    <div class="row property">
      <span class="column">{{property.bedrooms}} rooms</span>
      <span class="column">{{property.bathrooms}} rooms</span>
      <span class="column">{{property.carspaces}} car spaces</span>
      <span class="column" v-if="property.landArea">{{property.landArea}} sqm</span>
    </div>
    <div class="row property">
      <a :href="propertyLink" target="_blank" class="column">Go to ad</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { VueFlux, FluxIndex, FluxPreloader } from 'vue-flux'

export default Vue.extend({
  components: {
    VueFlux,
    FluxIndex,
    FluxPreloader,
  },
  data: () => ({
    vfOptions: {
      autoplay: true,
      delay: 3000,
    },
    vfTransitions: [
      {
        name: 'slide',
        totalDuration: 300,
      },
    ],
  }),
  computed: {
    propertyLink () {
      return `https://www.domain.com.au/${this.property.listingSlug}`
    }
  },
  props: {
    property: Object,
  },
})
</script>
