<template>
  <a href="#" class="pl-button small full" @click.prevent.stop="openSchoolFilter">
    <font-awesome-icon icon="school" size="lg"/>
  </a>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    openSchoolFilter: Function
  }
})
</script>
