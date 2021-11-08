<template>
  <div>
    <div class="d-flex align-items-center justify-content-between">
      <span>{{ propertyTypes }}</span>
      <a href="#" class="pl-button small link" @click.prevent.stop="openPropertyFilter">
        <font-awesome-icon icon="sliders-h"/>
      </a>
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <font-awesome-icon icon="bed"/>
      {{ propertiesFilter.rooms }}
      <font-awesome-icon icon="bath"/>
      {{ propertiesFilter.bathrooms }}
      <font-awesome-icon icon="car"/>
      {{ propertiesFilter.carSpaces }}
      <font-awesome-icon icon="dollar-sign"/>
      {{ fmtPrice }}
      <a href="#" class="pl-button small link" @click.prevent.stop="loadListings">
        <font-awesome-icon icon="sync"/>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default Vue.extend({
  props: {
    openPropertyFilter: Function
  },
  computed: {
    ...mapGetters(['propertiesFilter']),
    fmtPrice () {
      return new Intl.NumberFormat('en-AU').format(this.propertiesFilter.maxPrice)
    },
    propertyTypes () {
      return this.propertiesFilter.types.join(', ')
    }
  },
  methods: {
    ...mapActions(['loadListings']),
  }
})
</script>
