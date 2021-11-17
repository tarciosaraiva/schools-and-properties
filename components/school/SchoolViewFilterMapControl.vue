<template>
  <button title="Show schools filter dialog" @click="openSchoolFilter">
    <font-awesome-icon icon="school" size="lg" />
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
