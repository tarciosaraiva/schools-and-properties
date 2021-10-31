<template>
  <div class="popup-info container">
    <vue-flux
      :options="vfOptions"
      :images="property.media"
      :transitions="vfTransitions"
      style="width:390px"
    >
      <template #preloader>
        <flux-preloader />
      </template>
      <template #controls>
        <flux-index />
      </template>
    </vue-flux>
    <div class="property-stats">
      <p class="price">{{ property.price }}</p>
      <p class="address">
        <em>{{ property.displayableAddress }}</em>
      </p>
      <p class="division">
        <span>{{property.bedrooms}} rooms</span>
        <span>{{property.bathrooms}} bathrooms</span>
        <span>{{property.carspaces}} car spaces</span>
        <span v-if="property.landArea">{{property.landArea}} sqm</span>
      </p>
      <ul v-if="property.features">
        <li v-for="f in property.features" :key="f">
          <em>{{ f }}</em>
        </li>
      </ul>
    </div>
    <div class="button-group">
      <a :href="propertyLink" target="_blank" class="small button">Go to ad on domain.com.au</a>
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
  props: {
    property: Object,
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
})
</script>
