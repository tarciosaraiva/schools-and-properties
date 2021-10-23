import { GetterTree, ActionTree, MutationTree } from 'vuex'

const DOMAIN_API_KEY = 'key_78b0335f263283d1293a338095709f3c'

interface ListingRequest {
  polygonId: number,
  polygonPoints: PolygonPoints[]
}

interface PolygonPoints {
  lon: number, lat: number
}

export interface SchoolZoneProperties {
  polygonId: number,
  listings: any[]
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
  polygonId: number,
}

export const state = () => ({
  list: [] as PropertyListing[]
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  ADD_LISTINGS (state, payload: SchoolZoneProperties) {
    payload.listings.map(({ listing }) => {
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
        polygonId: payload.polygonId
      }

      state.list.push(propertyListing)
    })
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async loadListings ({ commit, state }, request: ListingRequest) {
    const result = state.list.find(i => i.polygonId === request.polygonId)
    if (!result) {
      const payload = {
        listingType: 'Sale',
        propertyTypes: ['House'],
        minBedrooms: 3,
        minBathrooms: 2,
        minCarspaces: 1,
        geoWindow: { polygon: { points: request.polygonPoints } }
      }

      const listings = await this.$axios.$post('https://api.domain.com.au/v1/listings/residential/_search', payload, { headers: {'X-Api-Key': DOMAIN_API_KEY } })
      commit('ADD_LISTINGS', { polygonId: request.polygonId, listings })
    }
  }
}
