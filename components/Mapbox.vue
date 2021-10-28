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
import { mapActions } from 'vuex'
import maplibregl from 'maplibre-gl'

import PropertyPopupContent from '~/components/PropertyPopupContent.vue'
import SchoolPopupContent from '~/components/SchoolPopupContent.vue'
import { PropertyListing } from '~/store/index'

export default Vue.extend({

  props: ['listings', 'schoolsFilter', 'flyToCenter'],

  data () {
    return {
      map: {} as any,
      currentSelectedZoneId: 0,
      markers: [] as any[]
    }
  },

  watch: {
    flyToCenter (newCenter, _) {
      if (newCenter.length === 2) {
        this.flyMapToCenter(newCenter)
      }
    },
    schoolsFilter: {
      handler (currentFilter, _) {
        this.map.setFilter('school-point', this.getLayerFilter(currentFilter))
      },
      deep: true
    },
    listings (newListings, _) {
      // clear so as the filter changes we only get properties matching it
      this.markers.forEach(m => m.remove())

      newListings.forEach((p: PropertyListing) => {
        const lngLat = [p.longitude, p.latitude]
        const hasPoi = this.markers.find(m => m.getLngLat() === lngLat)

        if (!hasPoi) {
          const popup = new maplibregl.Popup({ maxWidth: '400px', closeButton: false })
            .setHTML(`<div id="property-popup-content-${p.id}"></div>`)
            .on('open', () => {
              new PropertyPopupContent({ propsData: { property: p } })
                .$mount(`#property-popup-content-${p.id}`)
            })

          const el = document.createElement('div')
          el.style.backgroundImage = `url(${require('~/assets/images/location.png')})`
          el.style.width = '32px'
          el.style.height = '32px'
          el.style.backgroundSize = '100%'

          const marker = new maplibregl.Marker(el)
            .setLngLat([p.longitude, p.latitude])
            .setPopup(popup)
            .addTo(this.map)

          this.markers.push(marker)
        }
      })
    }
  },

  methods: {
    ...mapActions(['setBoundingBox']),

    onZoomOrMoveEvent (e: any) {
      this.setBoundingBox(e.target.getBounds())
    },

    flyMapToCenter (center: any) {
      this.map.flyTo({
        center,
        zoom: 14
      })
    },

    onSchoolPoiClick (e: any) {
      const features = e.target.queryRenderedFeatures(e.point, { layers: ['primary-schools-fill', 'school-point'] })
      const poiFeature = features.filter((f: any) => f.source === 'school-locations')[0]
      const coordinates = poiFeature.geometry.coordinates.slice();
      const props = poiFeature.properties;

      // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the
      // popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new maplibregl.Popup({ maxWidth: '300px', closeButton: false })
          .setHTML(`<div id="school-popup-content-${poiFeature.id}"></div>`)
          .on('open', () => {
            new SchoolPopupContent({ propsData: { school: props } })
              .$mount(`#school-popup-content-${poiFeature.id}`)
          })
          .setLngLat(coordinates)
          .addTo(e.target)

      const fillFeature = features.filter((f: any) => f.source === 'primary-schools')[0]

      if (this.currentSelectedZoneId > 0) {
        e.target.setFeatureState({ source: 'primary-schools', id: this.currentSelectedZoneId }, { selected: false })
        this.currentSelectedZoneId = 0;
      }

      if (props.educationSector === 'Government') {
        e.target.setFeatureState({ source: 'primary-schools', id: fillFeature.id }, { selected: true })
        this.currentSelectedZoneId = fillFeature.id
      }
    },

    getLayerFilter (schoolsFilter: any) {
      let eduSectorFilter: any = ['==', ['get', 'educationSector'], 'Government']
      if (schoolsFilter.educationSector === 'NonGovernment') {
        eduSectorFilter[0] = '!='
      } else if (schoolsFilter.educationSector === 'all') {
        eduSectorFilter = null
      }

      const ratingFilter = ['>=', ['get', 'primaryOverallScore'], `${schoolsFilter.rating}`]
      const engRatingFilter = ['>=', ['get', 'primaryEnglishScore'], `${schoolsFilter.englishRating}`]
      const mathsRatingFilter = ['>=', ['get', 'primaryMathsScore'], `${schoolsFilter.mathsRating}`]

      return [
        'all',
        eduSectorFilter,
        ratingFilter,
        engRatingFilter,
        mathsRatingFilter
      ].filter(i => i !== null)
    },

    mapLoaded () {
      this.setBoundingBox(this.map.getBounds())

      this.map.loadImage(require('~/assets/images/primary-school.png'), (err: any, img: any) => {
        if (err) throw err;
        this.map.addImage('primary-school', img);
      })

      this.map.loadImage(require('~/assets/images/secondary-school.png'), (err: any, img: any) => {
        if (err) throw err;
        this.map.addImage('secondary-school', img);
      })

      this.map
        .on('zoomend', this.onZoomOrMoveEvent)
        .on('moveend', this.onZoomOrMoveEvent)
        .addSource('primary-schools', {
          type: 'geojson',
          generateId: true,
          data: `https://api.maptiler.com/data/${process.env.primaryZones}/features.json?key=${process.env.mapTilerSecret}`,
          attribution: 'Department of Training and Education'
        })
        .addLayer({
          id: 'primary-schools-fill',
          type: 'fill',
          source: 'primary-schools',
          paint: {
            'fill-color': [
              'case',
              ['boolean', ['feature-state', 'selected'], false],
              'rgba(214, 178, 17, 0.5)',
              'rgba(255, 255, 255, 0.1)'
            ]
          },
        })
        .addLayer({
          id: 'primary-schools-line',
          type: 'line',
          source: 'primary-schools',
          paint: {
            'line-color': 'rgb(214, 178, 17)',
            'line-width': 2,
          },
        })
        .addSource('school-locations', {
          type: 'geojson',
          data: `https://api.maptiler.com/data/06ea284f-1eec-43ec-92f6-9026d826371e/features.json?key=${process.env.mapTilerSecret}`,
          generateId: true,
          attribution: 'Department of Training and Education, BetterEducation'
        })
        .addLayer({
          id: 'school-point',
          type: 'symbol',
          source: 'school-locations',
          layout: {
            'icon-image': [
              'case',
              ['==', ['get', 'schoolType'], 'Primary'],
              'primary-school',
              'secondary-school'
            ],
            'text-anchor': 'left',
            'text-justify': 'left',
            'text-field': [
              'concat',
              ['get', 'schoolName'],
              ' (',
              ['get', 'educationSector'],
              ')'
            ],
            'text-size': 10,
            'text-offset': [2, 0]
          }
        })
        .on('click', 'school-point', this.onSchoolPoiClick)
        .on('mouseenter', 'school-point', (e: any) => {
          e.target.getCanvas().style.cursor = 'pointer';
        })
        .on('mouseleave', 'school-point', (e: any) => {
          e.target.getCanvas().style.cursor = '';
        })
        .setFilter('school-point', this.getLayerFilter(this.schoolsFilter))
    },

    addControls () {
      const scaleControl = new maplibregl.ScaleControl({})
      const navControl = new maplibregl.NavigationControl({})
      const geolocateControl = new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: false
      })

      this.map.addControl(scaleControl, 'bottom-right')
      this.map.addControl(navControl, 'bottom-right')
      this.map.addControl(geolocateControl)
    }
  },

  mounted() {
    this.map = new maplibregl.Map({
      container: 'map',
      style: `https://api.maptiler.com/maps/streets/style.json?key=${process.env.mapTilerSecret}`,
      center: [144.9646, -37.0201],
      zoom: 7,
    })

    this.addControls()
    this.map.on('load', this.mapLoaded)
  }
})
</script>

<style>
.mapboxgl-ctrl-group button {
  margin-bottom: 0;
}

.school-popup p {
  margin-bottom: 0;
}
</style>
