<template>
  <div id="map">
    <a
      href="https://www.maptiler.com"
      style="position: absolute; right: 1rem; bottom: 2rem; z-index: 999"
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
import { PropertyListing, SchoolsFilter } from '~/store'
import { dataSources, buildSchoolLocationFilterExpression } from '~/utils/mapbox'

const SCHOOL_POINT_LAYER_NAME = 'school-point'

export default Vue.extend({
  props: {
    listings: {
      type: Array as () => PropertyListing[]
    },
    schoolsFilter: {
      type: Object as () => SchoolsFilter
    },
    flyToCenter: {
      type: Array
    }
  },

  data() {
    return {
      map: {} as any,
      markers: [] as any[],
    }
  },

  computed: {
    schoolZoneDataSources: () => dataSources.filter((ds: any) => ds.id !== 'school-locations')
  },

  watch: {
    flyToCenter(newCenter, _) {
      if (newCenter.length === 2) {
        this.flyMapToCenter(newCenter)
      }
    },
    schoolsFilter: {
      handler(currentFilter, _) {
        this.map.setFilter(SCHOOL_POINT_LAYER_NAME, buildSchoolLocationFilterExpression(currentFilter))
        this.schoolZoneDataSources.forEach((ds: any) => {
          this.map.setLayoutProperty(
            `${ds.id}-line`,
            'visibility',
            this.evaluateLayerVisibility(ds.id, currentFilter)
          )
        })
      },
      deep: true,
    },
    listings(newListings, _) {
      // clear so as the filter changes we only get properties matching it
      this.markers.forEach((m) => m.remove())

      newListings.forEach((p: PropertyListing) => {
        const lngLat = [p.longitude, p.latitude]
        const hasPoi = this.markers.find((m) => m.getLngLat() === lngLat)

        if (!hasPoi) {
          const popup = new maplibregl.Popup({
            maxWidth: '400px',
            closeButton: false,
          })
            .setHTML(`<div id="property-popup-content-${p.id}"></div>`)
            .on('open', () => {
              new PropertyPopupContent({ propsData: { property: p } }).$mount(`#property-popup-content-${p.id}`)
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
    },
  },

  methods: {
    ...mapActions(['setBoundingBox']),

    onZoomOrMoveEvent(e: any) {
      this.setBoundingBox(e.target.getBounds())
    },

    flyMapToCenter(center: any) {
      this.map.flyTo({ center, zoom: 14 })
    },

    onSchoolPoiClick(e: any) {
      const poiFeature = e.features[0]
      const coordinates = poiFeature.geometry.coordinates.slice()
      const props = poiFeature.properties

      // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the
      // popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
      }

      new maplibregl.Popup({ closeButton: false })
        .setHTML(`<div id="school-popup-content-${poiFeature.id}"></div>`)
        .on('open', () => {
          new SchoolPopupContent({ propsData: { school: props } }).$mount(`#school-popup-content-${poiFeature.id}`)
        })
        .setLngLat(coordinates)
        .addTo(e.target)
    },

    evaluateLayerVisibility(datasourceId: string, schoolsFilter: any) {
      return datasourceId.startsWith(schoolsFilter.zone) ? 'visible' : 'none'
    },

    mapLoaded() {
      this.setBoundingBox(this.map.getBounds())

      this.map.loadImage(
        require('~/assets/images/primary-school.png'),
        (err: any, img: any) => {
          if (err) throw err
          this.map.addImage('primary-school', img)
        }
      )

      this.map.loadImage(
        require('~/assets/images/secondary-school.png'),
        (err: any, img: any) => {
          if (err) throw err
          this.map.addImage('secondary-school', img)
        }
      )

      // add isolated events
      this.map
        .on('zoomend', this.onZoomOrMoveEvent)
        .on('moveend', this.onZoomOrMoveEvent)

      // add data sources
      dataSources.forEach((dataSource: any) => {
        this.map
          .addSource(dataSource.id, {
            type: 'geojson',
            generateId: true,
            data: dataSource.uri,
          })
      })

      this.schoolZoneDataSources.forEach((dataSource: any) => {
        this.map
          .addLayer({
            id: `${dataSource.id}-line`,
            type: 'line',
            source: dataSource.id,
            layout: {
              visibility: this.evaluateLayerVisibility(dataSource.id, this.schoolsFilter),
            },
            paint: {
              'line-color': `rgb(${dataSource.color.r}, ${dataSource.color.g}, ${dataSource.color.b})`,
              'line-width': 2,
            },
          })
      })

      this.map
        .addLayer({
          id: SCHOOL_POINT_LAYER_NAME,
          type: 'symbol',
          source: 'school-locations',
          layout: {
            'icon-image': [
              'case',
              ['==', ['get', 'schoolType'], 'Primary'],
              'primary-school',
              ['!=', ['get', 'schoolType'], 'Primary'],
              'secondary-school',
              'primary-school',
            ],
            'text-anchor': 'left',
            'text-justify': 'left',
            'text-field': [
              'concat',
              ['get', 'schoolName'],
              ' (',
              ['get', 'educationSector'],
              ')',
            ],
            'text-size': 10,
            'text-offset': [2, 0],
          },
        })
        .on('click', SCHOOL_POINT_LAYER_NAME, this.onSchoolPoiClick)
        .on('mouseenter', SCHOOL_POINT_LAYER_NAME, (e: any) => {
          e.target.getCanvas().style.cursor = 'pointer'
        })
        .on('mouseleave', SCHOOL_POINT_LAYER_NAME, (e: any) => {
          e.target.getCanvas().style.cursor = ''
        })
        .setFilter(SCHOOL_POINT_LAYER_NAME, buildSchoolLocationFilterExpression(this.schoolsFilter))
    },

    addControls() {
      this.map.addControl(new maplibregl.NavigationControl({}), 'bottom-left')
      this.map.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: false,
        }),
        'top-left'
      )
    },
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
  },
})
</script>
