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
import { PropertyListing } from '~/store/index'

export default Vue.extend({
  props: ['listings', 'schoolsFilter', 'flyToCenter'],

  data() {
    return {
      map: {} as any,
      currentSelectedZoneId: 0,
      markers: [] as any[],
    }
  },

  computed: {
    streetsStyle: () =>
      `https://api.maptiler.com/maps/streets/style.json?key=${process.env.mapTilerSecret}`,
    dataSources: () =>
      [
        {
          id: 'primary-schools',
          uri: `https://api.maptiler.com/data/${process.env.primaryZones}/features.json?key=${process.env.mapTilerSecret}`,
          color: {
            r: 214,
            g: 178,
            b: 17
          },
          visibilityFn: 'getPrimaryZoningVisibility'
        },
        {
          id: 'p7-schools',
          uri: `https://api.maptiler.com/data/${process.env.primaryZones}/features.json?key=${process.env.mapTilerSecret}`,
          color: {
            r: 46,
            g: 48,
            b: 137
          },
          visibilityFn: 'getP7ZoningVisibility'
        },
        {
          id: 'p8-schools',
          uri: `https://api.maptiler.com/data/${process.env.p8Zones}/features.json?key=${process.env.mapTilerSecret}`,
          color: {
            r: 46,
            g: 48,
            b: 137
          },
          visibilityFn: 'getP8ZoningVisibility'
        },
        {
          id: 'p9-schools',
          uri: `https://api.maptiler.com/data/${process.env.p9Zones}/features.json?key=${process.env.mapTilerSecret}`,
          color: {
            r: 46,
            g: 48,
            b: 137
          },
          visibilityFn: 'getP9ZoningVisibility'
        },
        {
          id: 'p10-schools',
          uri: `https://api.maptiler.com/data/${process.env.p10Zones}/features.json?key=${process.env.mapTilerSecret}`,
          color: {
            r: 46,
            g: 48,
            b: 137
          },
          visibilityFn: 'getP10ZoningVisibility'
        },
        {
          id: 'p11-schools',
          uri: `https://api.maptiler.com/data/${process.env.p11Zones}/features.json?key=${process.env.mapTilerSecret}`,
          color: {
            r: 46,
            g: 48,
            b: 137
          },
          visibilityFn: 'getP11ZoningVisibility'
        },
        {
          id: 'p12-schools',
          uri: `https://api.maptiler.com/data/${process.env.p12Zones}/features.json?key=${process.env.mapTilerSecret}`,
          color: {
            r: 46,
            g: 48,
            b: 137
          },
          visibilityFn: 'getP12ZoningVisibility'
        },
        {
          id: 'school-locations',
          uri: `https://api.maptiler.com/data/${process.env.schoolLocations}/features.json?key=${process.env.mapTilerSecret}`,
        },
      ] as any[],
  },

  watch: {
    flyToCenter(newCenter, _) {
      if (newCenter.length === 2) {
        this.flyMapToCenter(newCenter)
      }
    },
    schoolsFilter: {
      handler(currentFilter, _) {
        this.map.setFilter('school-point', this.getLayerFilter(currentFilter))
        this.dataSources.filter((ds: any) => ds.id !== 'school-locations').forEach((ds: any) => {
          this.map.setLayoutProperty(
            `${ds.id}-fill`,
            'visibility',
            this.evaluateLayerVisibility(ds.id, currentFilter)
          )
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
              new PropertyPopupContent({ propsData: { property: p } }).$mount(
                `#property-popup-content-${p.id}`
              )
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
      const features = e.target.queryRenderedFeatures(e.point, {
        layers: ['primary-schools-fill', 'school-point'],
      })
      const poiFeature = features.filter(
        (f: any) => f.source === 'school-locations'
      )[0]
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
          new SchoolPopupContent({ propsData: { school: props } }).$mount(
            `#school-popup-content-${poiFeature.id}`
          )
        })
        .setLngLat(coordinates)
        .addTo(e.target)

      const fillFeature = features.filter(
        (f: any) => f.source === 'primary-schools'
      )[0]

      if (this.currentSelectedZoneId > 0) {
        e.target.setFeatureState(
          { source: 'primary-schools', id: this.currentSelectedZoneId },
          { selected: false }
        )
        this.currentSelectedZoneId = 0
      }

      if (props.educationSector === 'Government') {
        e.target.setFeatureState(
          { source: 'primary-schools', id: fillFeature.id },
          { selected: true }
        )
        this.currentSelectedZoneId = fillFeature.id
      }
    },

    getLayerFilter(schoolsFilter: any) {
      let eduSectorFilter: any = [
        '==',
        ['get', 'educationSector'],
        'Government',
      ]

      if (schoolsFilter.educationSector === 'NonGovernment') {
        eduSectorFilter[0] = '!='
      } else if (schoolsFilter.educationSector === 'all') {
        eduSectorFilter = null
      }

      let showPrimarySchoolsFilter: any = []

      if (schoolsFilter.primary.plot) {
        showPrimarySchoolsFilter = ['in', ['get', 'schoolType'], ['literal', ['Primary', 'Pri/Sec']]]
      } else {
        showPrimarySchoolsFilter = ['in', ['get', 'schoolType'], '']
      }

      const primaryFilter = [
        'all',
        eduSectorFilter,
        showPrimarySchoolsFilter,
        [
          '>=',
          ['get', 'primaryOverallScore'],
          `${schoolsFilter.primary.rating}`,
        ],
        [
          '>=',
          ['get', 'primaryEnglishScore'],
          `${schoolsFilter.primary.englishRating}`,
        ],
        [
          '>=',
          ['get', 'primaryMathsScore'],
          `${schoolsFilter.primary.mathsRating}`,
        ],
      ].filter((i) => i !== null)

      let showSecondarySchoolsFilter: any = []

      if (schoolsFilter.secondary.plot) {
        showSecondarySchoolsFilter = ['in', ['get', 'schoolType'], ['literal', ['Secondary', 'Pri/Sec']]]
      } else {
        showSecondarySchoolsFilter = ['in', ['get', 'schoolType'], '']
      }

      const secondaryFilter = [
        'all',
        eduSectorFilter,
        showSecondarySchoolsFilter,
        [
          '>=',
          ['get', 'secondaryOverallScore'],
          `${schoolsFilter.secondary.rating}`,
        ],
        [
          '>=',
          ['get', 'secondaryEnglishScore'],
          `${schoolsFilter.secondary.englishRating}`,
        ],
        [
          '>=',
          ['get', 'secondaryMathsScore'],
          `${schoolsFilter.secondary.mathsRating}`,
        ],
      ].filter((i) => i !== null)

      return ['any', primaryFilter, secondaryFilter]
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
      this.dataSources.forEach((dataSource: any) => {
        this.map
          .addSource(dataSource.id, {
            type: 'geojson',
            generateId: true,
            data: dataSource.uri,
          })
      })

      this.dataSources.filter((ds: any) => ds.id !== 'school-locations').forEach((dataSource: any) => {
        this.map
          .addLayer({
            id: `${dataSource.id}-fill`,
            type: 'fill',
            source: dataSource.id,
            layout: {
              visibility: this.evaluateLayerVisibility(dataSource.id, this.schoolsFilter),
            },
            paint: {
              'fill-color': [
                'case',
                ['boolean', ['feature-state', 'selected'], false],
                `rgba(${dataSource.color.r}, ${dataSource.color.g}, ${dataSource.color.b}, 0.5)`,
                'rgba(255, 255, 255, 0.1)',
              ],
            },
          })
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
          id: 'school-point',
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
        .on('click', 'school-point', this.onSchoolPoiClick)
        .on('mouseenter', 'school-point', (e: any) => {
          e.target.getCanvas().style.cursor = 'pointer'
        })
        .on('mouseleave', 'school-point', (e: any) => {
          e.target.getCanvas().style.cursor = ''
        })
        .setFilter('school-point', this.getLayerFilter(this.schoolsFilter))
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
      style: this.streetsStyle,
      center: [144.9646, -37.0201],
      zoom: 7,
    })

    this.addControls()
    this.map.on('load', this.mapLoaded)
  },
})
</script>
