<template>
  <div id="map">
    <a
      href="https://www.maptiler.com"
      style="position: absolute; left: 14rem; bottom: 1rem; z-index: 100"
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

import SchoolFilterMapControl from '~/utils/SchoolFilterMapControl'
import SchoolLegendMapControl from '~/utils/SchoolLegendMapControl'
import SchoolZoneLayersMapControl from '~/utils/SchoolZoneLayersMapControl'
import PropertyFiltersMapControl from '~/utils/PropertyFiltersMapControl'
import PropertyPopupContent from '~/components/property/PropertyPopupContent.vue'
import SchoolPopupContent from '~/components/school/SchoolPopupContent.vue'
import { SchoolsFilter } from '~/store'
import {
  dataSources,
  buildSchoolLocationFilterExpression,
  buildSchoolIconImageExpression,
  loadImages
} from '~/utils/mapbox'

const PRIMARY_SCHOOL_POINT_LAYER_NAME = 'primary-school-point'
const SECONDARY_SCHOOL_POINT_LAYER_NAME = 'secondary-school-point'
const STREET_ZOOM = 16
const SUBURB_ZOOM = 14

export default Vue.extend({
  props: {
    listingPois: {
      type: Array as () => any[],
      default: () => ([])
    },
    schoolsFilter: {
      type: Object as () => SchoolsFilter,
      default: () => ({} as SchoolsFilter)
    },
    flyTo: {
      type: Object,
      default: () => ({})
    },
    openSchoolsFilterFn: {
      type: Function,
      default: () => () => {}
    }
  },

  data() {
    return {
      map: {} as any,
      visibleLayers: [] as string[]
    }
  },

  computed: {
    schoolZoneDataSources: () => dataSources.filter((ds: any) => ds.id !== 'school-locations')
  },

  watch: {
    flyTo(newCenter, _) {
      const zoomLevel = newCenter.placeType.includes('street') ? STREET_ZOOM : SUBURB_ZOOM
      this.flyMapTo(newCenter.center, zoomLevel)
    },
    schoolsFilter: {
      handler(currentFilter, _) {
        this.map.setFilter(PRIMARY_SCHOOL_POINT_LAYER_NAME, buildSchoolLocationFilterExpression(currentFilter))
        this.map.setFilter(SECONDARY_SCHOOL_POINT_LAYER_NAME, buildSchoolLocationFilterExpression(currentFilter, false))
      },
      deep: true,
    },
    listingPois(newPois, _) {
      this.map.getSource('properties').setData({
        type: 'FeatureCollection',
        features: newPois
      })
    }
  },

  mounted() {
    this.map = new maplibregl.Map({
      container: 'map',
      style: `https://api.maptiler.com/maps/streets/style.json?key=${process.env.mapTilerSecret}`,
      center: [145, -37.65],
      minZoom: 7,
      zoom: 8,
      fadeDuration: 100
    })

    this.addControls()
    this.map.on('load', this.mapLoaded)
  },

  methods: {
    ...mapActions(['setBoundingBox']),

    toggleLayer (layerPrefix: string) {
      const layerName = `${layerPrefix}-schools`

      if (this.visibleLayers.includes(layerName)) {
        const layerIdx = this.visibleLayers.indexOf(layerName)
        this.visibleLayers.splice(layerIdx, 1)
      } else {
        this.visibleLayers.push(layerName)
      }

      this.schoolZoneDataSources.forEach((ds: any) => {
        this.map.setLayoutProperty(
          `${ds.id}-line`,
          'visibility',
          this.evaluateLayerVisibility(ds.id)
        )
      })
    },

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

      const markerHeight = 40
      const markerRadius = 40
      const linearOffset = 25
      const popupOffsets: any = {
        'top': [0, 0],
        'top-left': [0, 0],
        'top-right': [0, 0],
        'bottom': [0, -markerHeight],
        'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'left': [markerRadius, (markerHeight - markerRadius) * -1],
        'right': [-markerRadius, (markerHeight - markerRadius) * -1]
      }

      new maplibregl.Popup({ closeButton: false, offset: popupOffsets })
        .setHTML(`<div id="school-popup-content-${poiFeature.id}"></div>`)
        .on('open', () => {
          new SchoolPopupContent({ propsData: { school: props } }).$mount(`#school-popup-content-${poiFeature.id}`)
        })
        .setLngLat(coordinates)
        .addTo(e.target)
    },

    onPropertyPointClick(e: any) {
      const poiFeature = e.features[0]
      const coordinates = poiFeature.geometry.coordinates.slice()
      const props = poiFeature.properties

      props.features = JSON.parse(props.features)
      props.media = JSON.parse(props.media)

      // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the
      // popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
      }

      // use trick from documentation to place the popup within the viewbox
      const markerHeight = 40
      const markerRadius = 20
      const linearOffset = 25
      const popupOffsets: any = {
        'top': [0, 0],
        'top-left': [0, 0],
        'top-right': [0, 0],
        'bottom': [0, -markerHeight],
        'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'left': [markerRadius, (markerHeight - markerRadius) * -1],
        'right': [-markerRadius, (markerHeight - markerRadius) * -1]
      }

      new maplibregl.Popup({ maxWidth: '300px', closeButton: false, offset: popupOffsets })
          .setHTML(`<div id="property-popup-content-${props.id}"></div>`)
          .on('open', () => {
            new PropertyPopupContent({ propsData: { property: props } }).$mount(`#property-popup-content-${props.id}`)
          })
          .setLngLat(coordinates)
          .addTo(e.target)
    },

    evaluateLayerVisibility(datasourceId: string) {
      return this.visibleLayers.includes(datasourceId) ? 'visible' : 'none'
    },

    mapLoaded() {
      this.setBoundingBox(this.map.getBounds())

      this.map.loadImage(
        require('~/assets/images/primary-school-unrated.png'),
        (err: any, img: any) => {
          if (err) throw err
          this.map.addImage('primary-school-unrated', img)
        }
      )

      this.map.loadImage(
        require('~/assets/images/primary-school-rated.png'),
        (err: any, img: any) => {
          if (err) throw err
          this.map.addImage('primary-school-rated', img)
        }
      )

      this.map.loadImage(
        require('~/assets/images/secondary-school-unrated.png'),
        (err: any, img: any) => {
          if (err) throw err
          this.map.addImage('secondary-school-unrated', img)
        }
      )

      this.map.loadImage(
        require('~/assets/images/secondary-school-rated.png'),
        (err: any, img: any) => {
          if (err) throw err
          this.map.addImage('secondary-school-rated', img)
        }
      )

      loadImages(this.map)

      // add isolated events
      this.map
        .on('zoomend', this.onZoomOrMoveEvent)
        .on('moveend', this.onZoomOrMoveEvent)

      // add data sources for school zones / pois
      dataSources.forEach((dataSource: any) => {
        this.map
          .addSource(dataSource.id, {
            type: 'geojson',
            generateId: true,
            data: dataSource.uri,
          })
      })

      // add line layer for school zone data sources
      this.schoolZoneDataSources.forEach((dataSource: any) => {
        this.map
          .addLayer({
            id: `${dataSource.id}-line`,
            type: 'line',
            source: dataSource.id,
            layout: {
              visibility: this.evaluateLayerVisibility(dataSource.id),
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

      // add school locations layers
      poiLayers.forEach((layerName: string) => {
        const primary = layerName === PRIMARY_SCHOOL_POINT_LAYER_NAME

        this.map
          .addLayer({
            id: layerName,
            type: 'symbol',
            source: 'school-locations',
            filter: buildSchoolLocationFilterExpression(this.schoolsFilter, primary),
            layout: {
              'icon-image': buildSchoolIconImageExpression(primary),
              'icon-offset': [0, -16]
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

      // add source and layer for property points
      this.map
        .addSource('properties', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: []
          }
        })
        .addLayer({
          id: 'properties-poi',
          type: 'symbol',
          source: 'properties',
          layout: {
            'icon-image': 'property-location',
            'icon-offset': [0, -16]
          }
        })
        .on('click', 'properties-poi', this.onPropertyPointClick)
        .on('mouseenter', 'properties-poi', (e: any) => {
          e.target.getCanvas().style.cursor = 'pointer'
        })
        .on('mouseleave', 'properties-poi', (e: any) => {
          e.target.getCanvas().style.cursor = ''
        })
    },

    addControls() {
      this.map.addControl(new maplibregl.NavigationControl({}), 'bottom-right')
      this.map.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: false,
        }),
        'bottom-right'
      )

      this.map.addControl(new PropertyFiltersMapControl(this.$store, 'types'))
      this.map.addControl(new PropertyFiltersMapControl(this.$store, 'beds'))
      this.map.addControl(new PropertyFiltersMapControl(this.$store, 'baths'))
      this.map.addControl(new PropertyFiltersMapControl(this.$store, 'cars'))
      this.map.addControl(new PropertyFiltersMapControl(this.$store, 'price'))
      this.map.addControl(new SchoolFilterMapControl(this.$store, this.openSchoolsFilterFn), 'top-left')
      this.map.addControl(new SchoolZoneLayersMapControl(this.$store, this.toggleLayer), 'top-left')
      this.map.addControl(new SchoolLegendMapControl(), 'bottom-left')
    },
  },
})
</script>
