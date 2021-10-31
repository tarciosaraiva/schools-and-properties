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
      <p>
        The Department of Education and Training’s
        <a href="https://www.education.vic.gov.au/Pages/disclaimer.aspx"
          >Disclaimer</a
        >,
        <a href="https://www.education.vic.gov.au/Pages/webprivacypolicy.aspx"
          >Privacy</a
        >
        and
        <a
          id="copyright-link"
          href="https://www.education.vic.gov.au/Pages/copyright.aspx"
          >Copyright</a
        >
        applies to information on this website.
      </p>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import SidebarNavigate from '~/components/SidebarNavigate.vue'
import SidebarFilter from '~/components/SidebarFilter.vue'
import Mapbox from '~/components/Mapbox.vue'

export default Vue.extend({
  components: { SidebarNavigate, SidebarFilter, Mapbox },
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
