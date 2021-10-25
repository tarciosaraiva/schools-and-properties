<template>
  <div id="map">
    <a
      href="https://www.maptiler.com"
      style="position: absolute; left: 10px; bottom: 10px; z-index: 999"
      ><img
        src="https://api.maptiler.com/resources/logo.svg"
        alt="MapTiler logo"
    /></a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import maplibregl from 'maplibre-gl'

import PopupContent from '~/components/PopupContent.vue'
import { PropertyListing } from '~/store/index'

export default Vue.extend({

  props: {
    loadListingsFn: Function
  },

  data() {
    return {
      currentHoveredSchoolZoneId: null as number | null
    }
  },

  methods: {
    mapLoaded (map: any) {
      map
        .addSource('primary-schools', {
          type: 'geojson',
          generateId: true,
          data: `https://api.maptiler.com/data/33dea49b-84a9-43ab-af10-a2455acfa88b/features.json?key=${process.env.mapTilerSecret}`,
        })
        .addLayer({
          id: 'primary-schools-fill',
          type: 'fill',
          source: 'primary-schools',
          layout: {},
          paint: {
            'fill-color': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              'rgba(255, 255, 255, 0.65)',
              'rgba(255, 255, 255, 0.2)'
            ]
          },
        })
        .addLayer({
          id: 'primary-schools-line',
          type: 'line',
          source: 'primary-schools',
          layout: {},
          paint: {
            'line-color': 'rgba(214, 178, 17, 0.25)',
            'line-width': 2,
          },
        })
        // events for layer
        .on('mouseenter', 'primary-schools-fill', (e: any) => {
          e.target.getCanvas().style.cursor = 'pointer'
        })
        .on('mousemove', 'primary-schools-fill', (e: any) => {
          if (e.features.length) {
            if (this.currentHoveredSchoolZoneId !== null) {
                e.target.setFeatureState(
                  { source: 'primary-schools', id: this.currentHoveredSchoolZoneId },
                  { hover: false }
                );
            }

            this.currentHoveredSchoolZoneId = Number(e.features[0].id)

            e.target.setFeatureState(
              { source: 'primary-schools', id: this.currentHoveredSchoolZoneId },
              { hover: true }
            )
          }
        })
        .on('mouseleave', 'primary-schools-fill', (e: any) => {
          e.target.getCanvas().style.cursor = ''

          if (this.currentHoveredSchoolZoneId !== null) {
            e.target.setFeatureState(
              { source: 'primary-schools', id: this.currentHoveredSchoolZoneId },
              { hover: false }
            )
          }
        })
        .on('click', 'primary-schools-fill', (e: any) => {
          if (e.features.length) {
            const hoveredFeatureId = Number(e.features[0].id)
            const featState = e.target.getFeatureState({ source: 'primary-schools', id: hoveredFeatureId })

            if (!featState.loaded) {
              const { id, geometry } = e.features[0]
              const polygonPoints = geometry.coordinates[0].map((c: any[]) => ({ lon: c[0], lat: c[1] }))
              this.loadListingsFn({ polygonId: id, polygonPoints })
              e.target.setFeatureState(
                { source: 'primary-schools', id: hoveredFeatureId },
                { loaded: true }
              )
            }
          }
        })
        .addSource('school-locations', {
          type: 'geojson',
          data: `https://api.maptiler.com/data/06ea284f-1eec-43ec-92f6-9026d826371e/features.json?key=${process.env.mapTilerSecret}`,
          cluster: true,
          generateId: true,
          clusterMaxZoom: 12,
          clusterMinPoints: 5,
          clusterRadius: 50,
        })
    },

    addControls (map: any) {
      const scaleControl = new maplibregl.ScaleControl({})
      const navControl = new maplibregl.NavigationControl({})
      const geolocateControl = new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: false
      })

      map.addControl(scaleControl, 'bottom-right')
      map.addControl(navControl, 'bottom-right')
      map.addControl(geolocateControl)
    }
  },

  mounted() {
    const map = new maplibregl.Map({
      accessToken: '',
      container: 'map',
      style: `https://api.maptiler.com/maps/streets/style.json?key=${process.env.mapTilerSecret}`,
      center: [144.9646, -37.0201],
      zoom: 7,
    })

    this.addControls(map)

    map.on('load', this.mapLoaded.bind(this, map))

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'ADD_LISTINGS') {
        state.list.forEach((p: PropertyListing) => {
          const popup = new maplibregl.Popup({ closeButton: false })
            .setHTML(`<div id="marker-popup-content-${p.id}"></div>`)
            .on('open', () => {
              new PopupContent({ propsData: { property: p } })
                .$mount(`#marker-popup-content-${p.id}`)
            })

          new maplibregl.Marker({ color: '#ff00ff', scale: 0.5 })
            .setLngLat([p.longitude, p.latitude])
            .setPopup(popup)
            .addTo(map)
        });
      }
    })
  }

})
</script>

<style>
.mapboxgl-ctrl-group button {
  margin-bottom: 0;
}
</style>
