<template>
  <button @click="openSchoolFilter">
    <font-awesome-icon icon="school" size="lg" title="Show schools filter dialog"/>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    openSchoolFilter: Function
  }
})
</script>
