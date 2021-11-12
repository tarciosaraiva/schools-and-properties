import { GetterTree, ActionTree, MutationTree } from 'vuex'

interface ApplicationFilter {
  properties: PropertiesFilter,
  schools: SchoolsFilter
}

interface PropertiesFilter {
  types: string[],
  rooms: number,
  bathrooms: number,
  carSpaces: number,
  maxPrice: number
}

export interface SchoolsFilter {
  educationSector: string,
  zone: string,
  primary: SchoolLevelRating,
  secondary: SchoolLevelRating,
}

interface SchoolLevelRating {
  plot: boolean,
  rating: number,
  englishRating: number,
  mathsRating: number
}

export interface PropertyListing {
  id: number,
  price: string,
  area: string
  bathrooms: number,
  bedrooms: number,
  carspaces: number,
  displayableAddress: string,
  features: string[],
  landArea: number,
  latitude: number,
  longitude: number,
  postcode: string,
  propertyType: string
  region: string,
  state: string,
  street: string,
  streetNumber: string,
  suburb: string,
  unitNumber: string,
  media: string[],
  listingSlug: string
}

export interface School {
  schoolName: string,
  educationSector: string,
  schoolType: string,
  phoneNumber: string,
  primaryOverallScore: string,
  primaryEnglishScore: string,
  primaryMathsScore: string,
  primaryEnrolments: string,
  secondaryOverallScore: string,
  secondaryEnglishScore: string,
  secondaryMathsScore: string,
  secondaryEnrolments: string
}

export const state = () => ({
  bounds: {
    ne: { lat: 0, lon: 0 },
    nw: { lat: 0, lon: 0 },
    se: { lat: 0, lon: 0 },
    sw: { lat: 0, lon: 0 },
  },
  geocodeSuggestions: [] as any,
  list: [] as PropertyListing[],
  filter: {
    properties: {
      types: ['House', 'Townhouse'],
      rooms: 3,
      bathrooms: 2,
      carSpaces: 1,
      maxPrice: 900000
    },
    schools: {
      educationSector: 'all',
      zone: 'none',
      primary: {
        plot: true,
        rating: 95,
        englishRating: 4,
        mathsRating: 4
      },
      secondary: {
        plot: true,
        rating: 95,
        englishRating: 4,
        mathsRating: 4
      }
    }
  } as ApplicationFilter
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  listings: state => state.list,
  schoolsFilter: state => state.filter.schools,
  propertiesFilter: state => state.filter.properties,
  locations: state => state.geocodeSuggestions,
  listingPois: state => state.list.map(l => ({
    type: 'Feature',
    id: l.id,
    geometry: {
      type: 'Point',
      coordinates: [l.longitude, l.latitude]
    },
    properties: { ...l }
  }))
}

export const mutations: MutationTree<RootState> = {
  ADD_LISTINGS (state, listings: any[]) {
    const propertyListings = listings
      .filter(l => l.type === 'PropertyListing')
      .map(({ listing }) => {
        const propertyListing: PropertyListing = {
          id: listing.id,
          price: listing.priceDetails?.displayPrice,
          area: listing.propertyDetails.area,
          bathrooms: listing.propertyDetails.bathrooms,
          bedrooms: listing.propertyDetails.bedrooms,
          carspaces: listing.propertyDetails.carspaces,
          displayableAddress: listing.propertyDetails.displayableAddress,
          features: listing.propertyDetails.features,
          landArea: listing.propertyDetails.landArea,
          latitude: listing.propertyDetails.latitude,
          longitude: listing.propertyDetails.longitude,
          postcode: listing.propertyDetails.postcode,
          propertyType: listing.propertyDetails.propertyType,
          region: listing.propertyDetails.region,
          state: listing.propertyDetails.state,
          street: listing.propertyDetails.street,
          streetNumber: listing.propertyDetails.streetNumber,
          suburb: listing.propertyDetails.suburb,
          unitNumber: listing.propertyDetails.unitNumber,
          media: listing.media.map((m: any) => m.url),
          listingSlug: listing.listingSlug
        }

        return propertyListing
      })

    state.list = propertyListings
  },
  UPDATE_PROPERTY_FILTER_TYPE (state, payload) {
    state.filter.properties.types = payload
  },
  UPDATE_PROPERTY_FILTER_ROOMS (state, payload) {
    state.filter.properties.rooms = Number(payload)
  },
  UPDATE_PROPERTY_FILTER_BATHROOMS (state, payload) {
    state.filter.properties.bathrooms = Number(payload)
  },
  UPDATE_PROPERTY_FILTER_CAR_SPACES (state, payload) {
    state.filter.properties.carSpaces = Number(payload)
  },
  UPDATE_PROPERTY_FILTER_MAX_PRICE (state, payload) {
    state.filter.properties.maxPrice = Number(payload)
  },
  UPDATE_BOUNDING_BOX (state, payload) {
    state.bounds.nw.lat = payload.getNorthWest().lat
    state.bounds.nw.lon = payload.getNorthWest().lng
    state.bounds.ne.lat = payload.getNorthEast().lat
    state.bounds.ne.lon = payload.getNorthEast().lng
    state.bounds.se.lat = payload.getSouthEast().lat
    state.bounds.se.lon = payload.getSouthEast().lng
    state.bounds.sw.lat = payload.getSouthWest().lat
    state.bounds.sw.lon = payload.getSouthWest().lng
  },
  UPDATE_SCHOOL_EDUCATION_SECTOR (state, payload) {
    state.filter.schools.educationSector = payload
  },
  UPDATE_SCHOOL_ZONE (state, payload) {
    state.filter.schools.zone = payload
  },
  UPDATE_PLOT_PRIMARY_SCHOOLS (state, payload) {
    state.filter.schools.primary.plot = payload
  },
  UPDATE_SCHOOL_PRIMARY_RATING (state, payload) {
    state.filter.schools.primary.rating = Number(payload)
  },
  UPDATE_SCHOOL_PRIMARY_ENG_RATING (state, payload) {
    state.filter.schools.primary.englishRating = Number(payload)
  },
  UPDATE_SCHOOL_PRIMARY_MATH_RATING (state, payload) {
    state.filter.schools.primary.mathsRating = Number(payload)
  },
  UPDATE_PLOT_SECONDARY_SCHOOLS (state, payload) {
    state.filter.schools.secondary.plot = payload
  },
  UPDATE_SCHOOL_SECONDARY_RATING (state, payload) {
    state.filter.schools.secondary.rating = Number(payload)
  },
  UPDATE_SCHOOL_SECONDARY_ENG_RATING (state, payload) {
    state.filter.schools.secondary.englishRating = Number(payload)
  },
  UPDATE_SCHOOL_SECONDARY_MATH_RATING (state, payload) {
    state.filter.schools.secondary.mathsRating = Number(payload)
  },
  ADD_GEOCODE_RESULTS (state, payload) {
    state.geocodeSuggestions = payload.map((f: any) => ({
      center: f.center,
      name: f.place_name,
      placeType: f.place_type
    }))
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async loadListings ({ commit, state }) {
    const { filter, bounds } = state

    const payload = {
      listingType: 'Sale',
      pageSize: 200,
      propertyTypes: filter.properties.types,
      minBedrooms: filter.properties.rooms,
      minBathrooms: filter.properties.bathrooms,
      minCarspaces: filter.properties.carSpaces,
      maxPrice: filter.properties.maxPrice,
      locations: [{ state: 'VIC' }],
      geoWindow: { box: { topLeft: bounds.nw, bottomRight: bounds.se } }
    }

    const listings = await this.$axios.$post('https://api.domain.com.au/v1/listings/residential/_search', payload, { headers: {'X-Api-Key': process.env.domainApiKey } })
    commit('ADD_LISTINGS', listings)
  },

  async geocode ({ commit }, searchTerm) {
    if (searchTerm) {
      const params = {
        key: process.env.mapTilerSecret,
        bbox: '141.24847451171752,-39.624732230379166,148.68072548828115,-34.32302549095252',
        language: 'en'
      }

      const geocodeResults = await this.$axios.$get(`https://api.maptiler.com/geocoding/${searchTerm}.json`, { params })
      const schoolsResults = await this.$axios.$get(`//${process.env.domain}/schools/schools.json`)
      const mappedSchoolResults = schoolsResults.map((s: any) => ({
        center: [s.lon, s.lat],
        place_name: s.schoolName,
        place_type: 'school'
      })).filter((s: any) => s.place_name.toLowerCase().includes(searchTerm))

      commit('ADD_GEOCODE_RESULTS', [...geocodeResults.features, ...mappedSchoolResults])
    } else {
      commit('ADD_GEOCODE_RESULTS', [])
    }
  },

  setBoundingBox({ commit }, payload) {
    commit('UPDATE_BOUNDING_BOX', payload)
  }
}
