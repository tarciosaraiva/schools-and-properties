<template>
  <div id="app">
    <header>
      <h1>Schools and properties</h1>
    </header>
    <main>
      <mapbox
        :schools-filter="schoolsFilter"
        :listings="listings"
        :fly-to-center="flyToCenter"
      />
      <form class="sidebar">
        <sidebar-navigate :geocode-fn="geocode" @navigate="onNavigate" />
        <sidebar-filter :load-listings-fn="loadListings" />
      </form>
    </main>
    <footer>
      <div class="attributions-container">
        <img class="attribution" src="~/assets/images/powered-by-domain-rgb.png" alt="Powered by Domain" />
        <p>Check our disclaimer to know how we are handling this data and <a href="#"><label for="modal-control">attributions to appropriate data sources</label></a>.</p>
        <img class="attribution" src="~/assets/images/poweredby_apm_logo_horizontal_small_rgb.png" alt="Powered by APM" />
      </div>
    </footer>
    <attribution-modal />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import SidebarNavigate from '~/components/SidebarNavigate.vue'
import SidebarFilter from '~/components/SidebarFilter.vue'
import Mapbox from '~/components/Mapbox.vue'
import AttributionModal from '~/components/AttributionModal.vue'

export default Vue.extend({
  components: { SidebarNavigate, SidebarFilter, Mapbox, AttributionModal },
  data() {
    return {
      flyToCenter: [] as number[],
    }
  },
  computed: {
    ...mapGetters(['listings', 'schoolsFilter']),
  },
  methods: {
    ...mapActions(['loadListings', 'geocode']),
    onNavigate(center: any) {
      this.flyToCenter = center
    },
  },
})
</script>
