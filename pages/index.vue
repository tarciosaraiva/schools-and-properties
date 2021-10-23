<template>
  <div id="app">
    <header>
      <h1>Schools and properties</h1>
    </header>
    <main>
      <sidebar-filter class="sidebar" />
      <mapbox :loadListingsFn="loadListings" />
    </main>
    <footer>
      <small>Copyright notice goes here.</small>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import SidebarFilter from '~/components/SidebarFilter.vue'
import Mapbox from '~/components/Mapbox.vue'

export default Vue.extend({
  components: { SidebarFilter, Mapbox },

  methods: {
    ...mapActions(['loadListings'])
  },

  mounted() {

    //   this.map.addLayer({
    //     id: 'clusters',
    //     type: 'circle',
    //     source: 'school-locations',
    //     filter: ['has', 'point_count'],
    //     paint: {
    //       'circle-color': [
    //         'step',
    //         ['get', 'point_count'],
    //         '#51bbd6',
    //         100,
    //         '#f1f075',
    //         750,
    //         '#f28cb1',
    //       ],
    //       'circle-radius': [
    //         'step',
    //         ['get', 'point_count'],
    //         20,
    //         100,
    //         30,
    //         750,
    //         40,
    //       ],
    //     },
    //   })

    //   this.map.addLayer({
    //     id: 'cluster-count',
    //     type: 'symbol',
    //     source: 'school-locations',
    //     filter: ['has', 'point_count'],
    //     layout: {
    //       'text-field': '{point_count_abbreviated}',
    //       'text-size': 12,
    //     },
    //   })

    //   this.map.addLayer({
    //     id: 'unclustered-point',
    //     type: 'circle',
    //     source: 'school-locations',
    //     filter: ['!', ['has', 'point_count']],
    //     paint: {
    //       'circle-radius': 7,
    //       'circle-stroke-width': 2,
    //       'circle-stroke-color': '#fff',
    //       'circle-color': [
    //         'case',
    //         ['==', ['get', 'educationSector'], 'Government'],
    //         '#0000ff',
    //         ['==', ['get', 'educationSector'], 'Catholic'],
    //         '#ff0000',
    //         '#00ff00'
    //       ]
    //     }
    //   })

    //   this.map.on('click', 'unclustered-point', (e) => {
    //     const coordinates = e.features[0].geometry.coordinates.slice();
    //     const props = e.features[0].properties;

    //     // Ensure that if the map is zoomed out such that
    //     // multiple copies of the feature are visible, the
    //     // popup appears over the copy being pointed to.
    //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //     }

    //     new maplibregl.Popup({})
    //         .setLngLat(coordinates)
    //         .setHTML(`<p>${props.School_Name}</p>`)
    //         .addTo(this.map);
    //   })

    //   this.map.on('mouseenter', 'unclustered-point', () => {
    //     this.map.getCanvas().style.cursor = 'pointer';
    //   })

    //   this.map.on('mouseleave', 'unclustered-point', () => {
    //     this.map.getCanvas().style.cursor = '';
    //   })
  },
})
</script>

<style>
body, html {
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  border-bottom: 1px solid #ccc;
  padding: 2rem 0 0 2rem;
}

main {
  display: flex;
  flex-grow: 1;
  position: relative;
}

footer {
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
}

.sidebar {
  border-right: 1px solid #ccc;
  flex-basis: 400px;
  padding: 1rem 2rem 0 2rem;
}

#map {
  flex-grow: 1;
  position: relative;
}
</style>
