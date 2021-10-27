import { shallowMount, createLocalVue } from '@vue/test-utils'
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
      'UPDATE_SCHOOL_MATH_RATING': jest.fn()
    }
    store = new Vuex.Store({ state, mutations })
    wrapper = shallowMount(SidebarFilter, { propsData, store, localVue })
  });

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
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
    const inputs = wrapper.findAll('#s_edu_sector')
    const checkedElement = inputs.filter(i => i.element.checked)
    expect(checkedElement).toHaveLength(1)
    expect(checkedElement.at(0).element.value).toBe(store.state.filter.schools.educationSector)
  })

  test('overall rating default value match state', () => {
    const input = wrapper.find('#s_rating')
    expect(Number(input.element.value)).toBe(store.state.filter.schools.rating)
  })

  test('english rating default value match state', () => {
    const input = wrapper.find('#s_english_rating')
    expect(Number(input.element.value)).toBe(store.state.filter.schools.englishRating)
  })

  test('maths rating default value match state', () => {
    const input = wrapper.find('#s_maths_rating')
    expect(Number(input.element.value)).toBe(store.state.filter.schools.mathsRating)
  })

  test('should invoke passed "loadListingFn" when applying filter', () => {
    const button = wrapper.find('button')
    button.trigger('click')
    expect(propsData.loadListingsFn).toHaveBeenCalled()
  })

  test('should have committed a new mutation to the store when a form field changes', () => {
    const input = wrapper.find('#s_maths_rating')
    input.element.value = '2'
    input.trigger('change')

    expect(mutations.UPDATE_SCHOOL_MATH_RATING).toHaveBeenCalledWith(store.state, '2')
  })
})
