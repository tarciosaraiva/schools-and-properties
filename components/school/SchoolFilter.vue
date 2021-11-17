<template>
  <modal @close="closeFn">
    <template #header>
      <h2>School filter</h2>
    </template>
    <template #body>
  <form>
      <div class="pl-row">
        <div class="pl-col">
          <label for="s_edu_sector">Education sector</label>
          <select id="s_edu_sector" v-model="sEducationSector">
            <option value="all">All</option>
            <option value="Government">Government</option>
            <option value="NonGovernment">Non Government</option>
          </select>
        </div>
      </div>
      <div class="pl-row">
        <div class="pl-col">
          <label for="s_show_primary_schools" class="checkbox">
          <input
            id="s_show_primary_schools"
            v-model="sPlotPrimary"
            type="checkbox"
          /> Show primary schools</label>
        </div>
      </div>
      <div class="pl-row">
        <div class="pl-col">
          <label for="s_prim_rating">Overall score</label>
          <select id="s_prim_rating" v-model="sPrimRating">
            <option value="100">= 100</option>
            <option value="99">>= 99</option>
            <option value="98">>= 98</option>
            <option value="97">>= 97</option>
            <option value="96">>= 96</option>
            <option value="95">>= 95</option>
            <option value="94">>= 94</option>
            <option value="93">>= 93</option>
            <option value="92">>= 92</option>
            <option value="91">>= 91</option>
            <option value="90">>= 90</option>
            <option value="0">All schools</option>
          </select>
        </div>
      </div>
      <div class="pl-row">
        <div class="pl-col">
          <label for="s_show_secondary_schools">
          <input
            id="s_show_secondary_schools"
            v-model="sPlotSecondary"
            type="checkbox" /> Show secondary schools</label>
        </div>
      </div>
      <div class="pl-row">
        <div class="pl-col">
          <label for="s_sec_rating">Overall score</label>
          <select id="s_sec_rating" v-model="sSecRating">
            <option value="100">= 100</option>
            <option value="99">>= 99</option>
            <option value="98">>= 98</option>
            <option value="97">>= 97</option>
            <option value="96">>= 96</option>
            <option value="95">>= 95</option>
            <option value="94">>= 94</option>
            <option value="93">>= 93</option>
            <option value="92">>= 92</option>
            <option value="91">>= 91</option>
            <option value="90">>= 90</option>
            <option value="0">All schools</option>
          </select>
        </div>
      </div>
  </form>
    </template>
  </modal>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

import Modal from '~/components/Modal.vue'

export default Vue.extend({
  components: { Modal },
  props: {
    closeFn: Function
  },
  computed: {
    ...mapGetters(['schoolsFilter']),
    sEducationSector: {
      get() {
        return this.schoolsFilter.educationSector
      },
      set(value) {
        this.$store.commit('UPDATE_SCHOOL_EDUCATION_SECTOR', value)
      },
    },
    sPlotPrimary: {
      get() {
        return this.schoolsFilter.primary.plot
      },
      set(value) {
        this.$store.commit('UPDATE_PLOT_PRIMARY_SCHOOLS', value)
      },
    },
    sPrimRating: {
      get() {
        return this.schoolsFilter.primary.rating
      },
      set(value) {
        this.$store.commit('UPDATE_SCHOOL_PRIMARY_RATING', value)
      },
    },
    sPlotSecondary: {
      get() {
        return this.schoolsFilter.secondary.plot
      },
      set(value) {
        this.$store.commit('UPDATE_PLOT_SECONDARY_SCHOOLS', value)
      },
    },
    sSecRating: {
      get() {
        return this.schoolsFilter.secondary.rating
      },
      set(value) {
        this.$store.commit('UPDATE_SCHOOL_SECONDARY_RATING', value)
      },
    },
  }
})
</script>
