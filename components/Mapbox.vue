<template>
  <div id="map">
    <a
      href="https://www.maptiler.com"
      style="position: absolute; right: 1rem; bottom: 2rem; z-index: 100"
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
import {
  dataSources,
  buildSchoolLocationFilterExpression,
  buildSchoolIconOpacityExpression,
  buildSchoolIconSizeExpression
} from '~/utils/mapbox'

const PRIMARY_SCHOOL_POINT_LAYER_NAME = 'primary-school-point'
const SECONDARY_SCHOOL_POINT_LAYER_NAME = 'secondary-school-point'

export default Vue.extend({
  props: {
    listings: {
      type: Array as () => PropertyListing[],
      default: () => ([])
    },
    schoolsFilter: {
      type: Object as () => SchoolsFilter,
      default: () => ({} as SchoolsFilter)
    },
    flyTo: {
      type: Object,
      default: () => ({})
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
    flyTo(newCenter, _) {
      const zoomLevel = newCenter.placeType.includes('street') ? 16 : 14
      this.flyMapTo(newCenter.center, zoomLevel)
    },
    schoolsFilter: {
      handler(currentFilter, _) {
        this.map.setFilter(PRIMARY_SCHOOL_POINT_LAYER_NAME, buildSchoolLocationFilterExpression(currentFilter))
        this.map.setFilter(SECONDARY_SCHOOL_POINT_LAYER_NAME, buildSchoolLocationFilterExpression(currentFilter, false))
        this.map.setLayoutProperty(PRIMARY_SCHOOL_POINT_LAYER_NAME, 'icon-size', buildSchoolIconSizeExpression(currentFilter))
        this.map.setLayoutProperty(SECONDARY_SCHOOL_POINT_LAYER_NAME, 'icon-size', buildSchoolIconSizeExpression(currentFilter, false))

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
          const popup = new maplibregl.Popup({ maxWidth: '400px', closeButton: false })
            .setHTML(`<div id="property-popup-content-${p.id}"></div>`)
            .on('open', () => {
              new PropertyPopupContent({ propsData: { property: p } }).$mount(`#property-popup-content-${p.id}`)
            })

          const marker = new maplibregl.Marker({ color: '#b5ad56' })
            .setLngLat([p.longitude, p.latitude])
            .setPopup(popup)
            .addTo(this.map)

          marker.getElement().style.cursor = 'pointer'

          this.markers.push(marker)
        }
      })
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

  methods: {
    ...mapActions(['setBoundingBox']),

    onZoomOrMoveEvent(e: any) {
      this.setBoundingBox(e.target.getBounds())
    },

    flyMapTo(center: number[], zoom: number ) {
      this.map.flyTo({ center, zoom })
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

      new maplibregl.Popup({ closeButton: false, offset: 20 })
        .setHTML(`<div id="school-popup-content-${poiFeature.id}"></div>`)
        .on('open', () => {
          new SchoolPopupContent({ propsData: { school: props } }).$mount(`#school-popup-content-${poiFeature.id}`)
        })
        .setLngLat(coordinates)
        .addTo(e.target)
    },

    evaluateLayerVisibility(datasourceId: string, schoolsFilter: SchoolsFilter) {
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

      // add line layer for data sources
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

      const poiLayers = [
        PRIMARY_SCHOOL_POINT_LAYER_NAME,
        SECONDARY_SCHOOL_POINT_LAYER_NAME
      ]

      poiLayers.forEach((layerName: string) => {
        const primary = layerName === PRIMARY_SCHOOL_POINT_LAYER_NAME

        this.map
          .addLayer({
            id: layerName,
            type: 'symbol',
            source: 'school-locations',
            paint: {
              'icon-opacity': buildSchoolIconOpacityExpression(primary),
            },
            filter: buildSchoolLocationFilterExpression(this.schoolsFilter, primary),
            layout: {
              'icon-size': buildSchoolIconSizeExpression(this.schoolsFilter, primary),
              'icon-image': primary ? 'primary-school' : 'secondary-school',
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
          .on('click', layerName, this.onSchoolPoiClick)
          .on('mouseenter', layerName, (e: any) => {
            e.target.getCanvas().style.cursor = 'pointer'
          })
          .on('mouseleave', layerName, (e: any) => {
            e.target.getCanvas().style.cursor = ''
          })
      })
    },

    addControls() {
      this.map.addControl(new maplibregl.NavigationControl({}), 'top-left')
      this.map.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: false,
        }),
        'top-left'
      )
    },
  },
})
</script>
