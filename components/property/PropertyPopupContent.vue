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
        <span v-show="property.bedrooms">
          <font-awesome-icon icon="bed"/>
          &nbsp;
          <span>{{property.bedrooms}}</span>
        </span>
        <span v-show="property.bathrooms">
          <font-awesome-icon icon="bath"/>
          &nbsp;
          <span>{{property.bathrooms}}</span>
        </span>
        <span v-show="property.carspaces">
          <font-awesome-icon icon="car"/>
          &nbsp;
          <span>{{property.carspaces}}</span>
        </span>
        <span v-show="property.landArea">
          <font-awesome-icon v-show="property.landArea" :icon="['far', 'square']"/>
          &nbsp;
          <span>{{property.landArea}} sqm</span>
        </span>
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
