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
        <a href="#"><label for="modal-control-disclaimer">Check our disclaimer to know more.</label></a>
        <a href="#"><label for="modal-control">Click for attributions to appropriate data sources.</label></a>
        <a href="https://www.buymeacoffee.com/tarciosaraiva" target="blank">Click here to buy me a coffee!</a>
        <a href="https://www.github.com/tarciosaraiva/schools-and-properties" target="blank">Project on Github</a>
        <a href="https://forms.gle/7xZTuGrb3w7VAUdq6" target="blank">Give us feedback!</a>
        <img class="attribution" src="~/assets/images/poweredby_apm_logo_horizontal_small_rgb.png" alt="Powered by APM" />
      </div>
    </footer>
    <disclaimer-modal />
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
import DisclaimerModal from '~/components/DisclaimerModal.vue'

export default Vue.extend({
  components: { SidebarNavigate, SidebarFilter, Mapbox, AttributionModal, DisclaimerModal },
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
