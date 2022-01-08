import { mutations, state } from '@/store'

describe('store', () => {
  describe('mutations', () => {
    describe('ADD_LISTINGS', () => {
      let stateToMutate = {}

      beforeEach(() => {
        stateToMutate = state()
      })

      it('should map listing without price', () => {
        const payload = require('./fixtures/listing-no-price.json')
        mutations.ADD_LISTINGS(stateToMutate, payload)

        expect(stateToMutate.list).toHaveLength(1)
        expect(stateToMutate.list[0].price).toBeUndefined()
      })

      it('should map listing with price and no media', () => {
        const payload = require('./fixtures/listing-no-media.json')
        mutations.ADD_LISTINGS(stateToMutate, payload)

        expect(stateToMutate.list).toHaveLength(1)
        expect(stateToMutate.list[0].media).toHaveLength(0)
      })

      it('should not map listing when type is not "Property Listing"', () => {
        const payload = require('./fixtures/listing-no-property-listing.json')
        mutations.ADD_LISTINGS(stateToMutate, payload)

        expect(stateToMutate.list).toHaveLength(0)
      })
    })

    describe('UPDATE_PROPERTY_FILTER_ROOMS', () => {
      it('should convert payload to number and store in state', () => {
        const stateToMutate = state()
        mutations.UPDATE_PROPERTY_FILTER_ROOMS(stateToMutate, '2')
        expect(stateToMutate.filter.properties.rooms).toEqual(2)
      })
    })

    describe('UPDATE_PROPERTY_FILTER_BATHROOMS', () => {
      it('should convert payload to number and store in state', () => {
        const stateToMutate = state()
        mutations.UPDATE_PROPERTY_FILTER_BATHROOMS(stateToMutate, '3')
        expect(stateToMutate.filter.properties.bathrooms).toEqual(3)
      })
    })

    describe('UPDATE_PROPERTY_FILTER_CAR_SPACES', () => {
      it('should convert payload to number and store in state', () => {
        const stateToMutate = state()
        mutations.UPDATE_PROPERTY_FILTER_CAR_SPACES(stateToMutate, '4')
        expect(stateToMutate.filter.properties.carSpaces).toEqual(4)
      })
    })

    describe('UPDATE_PROPERTY_FILTER_MAX_PRICE', () => {
      it('should convert payload to number and store in state', () => {
        const stateToMutate = state()
        mutations.UPDATE_PROPERTY_FILTER_MAX_PRICE(stateToMutate, '120000')
        expect(stateToMutate.filter.properties.maxPrice).toEqual(120000)
      })
    })

    describe('UPDATE_SCHOOL_PRIMARY_RATING', () => {
      it('should convert payload to number and store in state', () => {
        const stateToMutate = state()
        mutations.UPDATE_SCHOOL_PRIMARY_RATING(stateToMutate, '1')
        expect(stateToMutate.filter.schools.primary.rating).toEqual(1)
      })
    })

    describe('UPDATE_SCHOOL_SECONDARY_RATING', () => {
      it('should convert payload to number and store in state', () => {
        const stateToMutate = state()
        mutations.UPDATE_SCHOOL_SECONDARY_RATING(stateToMutate, '2')
        expect(stateToMutate.filter.schools.secondary.rating).toEqual(2)
      })
    })
  })
})
