<template>
  <div id="app">
    <header class="pl-row">
      <h1 class="pl-col-md-6 pl-col-sm-12">Schools and properties</h1>
      <navigate class="pl-col-md-6 pl-col-sm-12" :search-callback="searchCallback" :suggestions="locations" @navigate="onNavigate" />
    </header>
    <main>
      <mapbox
        :schools-filter="schoolsFilter"
        :listing-pois="listingPois"
        :fly-to="flyTo"
        :open-schools-filter-fn="openSchoolFilter"
      />
    </main>
    <footer class="pl-row">
      <div class="d-flex pl-col justify-content-between align-items-center">
        <img class="attribution" src="~/assets/images/powered-by-domain-rgb.png" alt="Powered by Domain" />
        <a href="#" @click.stop.prevent="openAbout"><small>About</small></a>
        <a href="#" @click.stop.prevent="openAttributions"><small>Attributions</small></a>
        <img class="attribution" src="~/assets/images/poweredby_apm_logo_horizontal_small_rgb.png" alt="Powered by APM" />
      </div>
    </footer>
    <attribution-modal v-show="showAttributions" :close-fn="closeAttributions" />
    <school-filter v-show="showSchoolFilter" :close-fn="closeSchoolFilter" />
    <about-modal v-show="showAbout" :close-fn="closeAbout" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import Navigate from '~/components/Navigate.vue'
import SchoolFilter from '~/components/school/SchoolFilter.vue'
import Mapbox from '~/components/Mapbox.vue'
import AttributionModal from '~/components/AttributionModal.vue'
import AboutModal from '~/components/AboutModal.vue'

export default Vue.extend({
  components: { Navigate, SchoolFilter, Mapbox, AttributionModal, AboutModal },
  data() {
    return {
      showSchoolFilter: false,
      showAttributions: false,
      showAbout: false,
      flyTo: {} as Object,
    }
  },
  computed: {
    ...mapGetters(['schoolsFilter', 'locations', 'listingPois']),
  },
  methods: {
    ...mapActions(['geocode']),
    searchCallback(searchTerm: string) {
      this.geocode(searchTerm)
    },
    onNavigate(center: number[], placeType: string[]) {
      this.flyTo = { center, placeType }
    },
    openAttributions () {
      this.showAttributions = true
    },
    closeAttributions () {
      this.showAttributions = false
    },
    openAbout () {
      this.showAbout = true
    },
    closeAbout () {
      this.showAbout = false
    },
    openSchoolFilter () {
      this.showSchoolFilter = true
    },
    closeSchoolFilter () {
      this.showSchoolFilter = false
    },
  },
})
</script>
