<template>
  <div class="school-legend-view">
    <div class="collapsable" :class="collapsed ? '' : 'expanded'">
      <div class="d-flex align-items-center justify-content-between">
        <img src="~/assets/images/primary-school-unrated-small.png" alt="Primary school unrated">
        <small>Primary school unrated</small>
      </div>
      <div class="d-flex align-items-center justify-content-between">
        <img src="~/assets/images/primary-school-rated-small.png" alt="Primary school unrated">
        <small>Primary school rated</small>
      </div>
      <div class="d-flex align-items-center justify-content-between">
        <img src="~/assets/images/secondary-school-unrated-small.png" alt="Secondary school unrated">
        <small>Secondary school unrated</small>
      </div>
      <div class="d-flex align-items-center justify-content-between">
        <img src="~/assets/images/secondary-school-rated-small.png" alt="Secondary school unrated">
        <small>Secondary school rated</small>
      </div>
      <div class="d-flex align-items-center justify-content-between">
        <img src="~/assets/images/property-location-small.png" alt="Property marker">
        <small>Property marker</small>
      </div>
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <h6>Legend</h6>
      <a href="#" @click.stop.prevent="toggleCollapse"><font-awesome-icon :icon="iconName" /></a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => {
    return {
      collapsed: true
    }
  },
  computed: {
    iconName () {
      return this.collapsed ? 'caret-square-up' : 'caret-square-down'
    }
  },
  methods: {
    toggleCollapse() {
      this.collapsed = !this.collapsed
    }
  }
})
</script>

<style scoped>
.school-legend-view h6 {
  margin-bottom: 0;
}

.school-legend-view .collapsable {
  height: 0;
  overflow-y: hidden;
  padding: 0;
  transition: all 0.3s ease;
}

.school-legend-view .collapsable.expanded {
  height: 145px;
}
</style>
