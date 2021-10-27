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
      <div class="sidebar">
        <sidebar-navigate :geocode-fn="geocode" @navigate="onNavigate" />
        <sidebar-filter :load-listings-fn="loadListings" />
      </div>
    </main>
    <footer>
      <small
        >School zone and locations sourced from
        <a href="https://www.data.vic.gov.au/" target="blank">Data Vic</a>.
        School rankings sourced from
        <a href="https://bettereducation.com.au/" target="blank"
          >Better Education</a
        >. Property listings sourced from
        <a href="https://www.domain.com.au/" target="blank">Domain</a>.
        <span
          >House Icons made by
          <a href="https://icon54.com/" title="Pixel perfect">Pixel perfect</a>
          from
          <a href="https://www.flaticon.com/" title="Flaticon"
            >www.flaticon.com</a
          ></span
        >
        <span
          >School Icons made by
          <a href="https://www.freepik.com" title="Freepik">Freepik</a> from
          <a href="https://www.flaticon.com/" title="Flaticon"
            >www.flaticon.com</a
          ></span
        >
      </small>
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
