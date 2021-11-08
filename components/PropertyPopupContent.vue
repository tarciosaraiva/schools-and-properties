<template>
  <div class="popup-info container">
    <vue-flux
      :options="vfOptions"
      :images="property.media"
      :transitions="vfTransitions"
      style="width:283px"
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
        <font-awesome-icon icon="bed"/>
        <span>{{property.bedrooms}}</span>
        <font-awesome-icon icon="bath"/>
        <span>{{property.bathrooms}}</span>
        <font-awesome-icon icon="car"/>
        <span>{{property.carspaces}}</span>
        <font-awesome-icon v-show="property.landArea" :icon="['far', 'square']"/>
        <span v-show="property.landArea">{{property.landArea}} sqm</span>
      </p>
      <ul v-show="property.features">
        <li v-for="f in property.features" :key="f">
          <em>{{ f }}</em>
        </li>
      </ul>
    </div>
    <div class="d-flex justify-content-around">
      <a :href="propertyLink" target="_blank" class="pl-button small full">Go to ad on domain.com.au</a>
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
    property: {
      type: Object,
      default: () => ({})
    },
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
