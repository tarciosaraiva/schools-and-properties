import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import { state } from '@/store'
import SidebarFilter from '@/components/SidebarFilter.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SidebarFilter', () => {
  let store
  let wrapper
  let propsData
  let mutations

  beforeEach(() => {
    propsData = { loadListingsFn: jest.fn() }
    mutations = {
      'UPDATE_PROPERTY_FILTER_TYPE': jest.fn(),
      'UPDATE_PROPERTY_FILTER_ROOMS': jest.fn(),
      'UPDATE_PROPERTY_FILTER_BATHROOMS': jest.fn(),
      'UPDATE_PROPERTY_FILTER_CAR_SPACES': jest.fn(),
      'UPDATE_PROPERTY_FILTER_MAX_PRICE': jest.fn(),
      'UPDATE_SCHOOL_EDUCATION_SECTOR': jest.fn(),
      'UPDATE_SCHOOL_PRIMARY_RATING': jest.fn(),
      'UPDATE_SCHOOL_PRIMARY_ENG_RATING': jest.fn(),
      'UPDATE_SCHOOL_PRIMARY_MATH_RATING': jest.fn(),
      'UPDATE_SCHOOL_SECONDARY_RATING': jest.fn(),
      'UPDATE_SCHOOL_SECONDARY_ENG_RATING': jest.fn(),
      'UPDATE_SCHOOL_SECONDARY_MATH_RATING': jest.fn()
    }
    store = new Vuex.Store({ state, mutations })
    wrapper = mount(SidebarFilter, { propsData, store, localVue })
  })

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly with props and store', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('property types default values matches state', () => {
    const houseInput = wrapper.find('#p_house_type')
    expect(houseInput.element.checked).toBeTruthy()

    const townhouseInput = wrapper.find('#p_townhouse_type')
    expect(townhouseInput.element.checked).toBeTruthy()

    const unitInput = wrapper.find('#p_unit_type')
    expect(unitInput.element.checked).toBeFalsy()
  })

  test('rooms default value match state', () => {
    const input = wrapper.find('#p_rooms')
    expect(Number(input.element.value)).toBe(store.state.filter.properties.rooms)
  })

  test('bathrooms default value match state', () => {
    const input = wrapper.find('#p_bathrooms')
    expect(Number(input.element.value)).toBe(store.state.filter.properties.bathrooms)
  })

  test('car spaces default value match state', () => {
    const input = wrapper.find('#p_car_spaces')
    expect(Number(input.element.value)).toBe(store.state.filter.properties.carSpaces)
  })

  test('max price default value match state', () => {
    const input = wrapper.find('#p_max_price')
    expect(Number(input.element.value)).toBe(store.state.filter.properties.maxPrice)
  })

  test('education sector default value matches state', () => {
    const input = wrapper.find('#s_edu_sector')
    expect(input.element.value).toBe(store.state.filter.schools.educationSector)
  })

  test('overall rating default value match state', () => {
    const input = wrapper.find('#s_prim_rating')
    expect(Number(input.element.value)).toBe(store.state.filter.schools.primary.rating)
  })

  test('english rating default value match state', () => {
    const input = wrapper.find('#s_prim_english_rating')
    expect(Number(input.element.value)).toBe(store.state.filter.schools.primary.englishRating)
  })

  test('maths rating default value match state', () => {
    const input = wrapper.find('#s_prim_maths_rating')
    expect(Number(input.element.value)).toBe(store.state.filter.schools.primary.mathsRating)
  })

  test('should invoke passed "loadListingFn" when applying filter', () => {
    const button = wrapper.find('button')
    button.trigger('click')
    expect(propsData.loadListingsFn).toHaveBeenCalled()
  })

  test.each([
    ['UPDATE_PROPERTY_FILTER_ROOMS', '#p_rooms', '2'],
    ['UPDATE_PROPERTY_FILTER_BATHROOMS', '#p_bathrooms', '3'],
    ['UPDATE_PROPERTY_FILTER_CAR_SPACES', '#p_car_spaces', '2'],
    ['UPDATE_PROPERTY_FILTER_MAX_PRICE', '#p_max_price', '500000'],
    ['UPDATE_SCHOOL_PRIMARY_RATING', '#s_prim_rating', '99'],
    ['UPDATE_SCHOOL_PRIMARY_ENG_RATING', '#s_prim_english_rating', '2'],
    ['UPDATE_SCHOOL_PRIMARY_MATH_RATING', '#s_prim_maths_rating', '3'],
    ['UPDATE_SCHOOL_SECONDARY_RATING', '#s_sec_rating', '98'],
    ['UPDATE_SCHOOL_SECONDARY_ENG_RATING', '#s_sec_english_rating', '1'],
    ['UPDATE_SCHOOL_SECONDARY_MATH_RATING', '#s_sec_maths_rating', '2'],
  ])(
    'should have committed mutation %p to the store when rating changes',
    (mutation, elementId, value) => {
      const input = wrapper.find(elementId)
      input.element.value = value
      input.trigger('change')

      expect(mutations[mutation]).toHaveBeenCalledWith(store.state, value)
    }
  )
})
