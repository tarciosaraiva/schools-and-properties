<template>
  <div class="marker-popup">
    <p>{{ property.displayableAddress }}</p>
    <p>{{ property.price }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    property: Object
  }
})
</script>

<style scoped>
.marker-popup p {
  margin-bottom: 0;
}
</style>
