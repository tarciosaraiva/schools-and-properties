import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import { state, getters } from '@/store'
import PropertyFilter from '~/components/PropertyFilter.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('PropertyFilter', () => {
  let store
  let wrapper
  let propsData
  let mutations

  beforeEach(() => {
    propsData = { closeFn: jest.fn() }
    mutations = {
      'UPDATE_PROPERTY_FILTER_TYPE': jest.fn(),
      'UPDATE_PROPERTY_FILTER_ROOMS': jest.fn(),
      'UPDATE_PROPERTY_FILTER_BATHROOMS': jest.fn(),
      'UPDATE_PROPERTY_FILTER_CAR_SPACES': jest.fn(),
      'UPDATE_PROPERTY_FILTER_MAX_PRICE': jest.fn(),
    }
    store = new Vuex.Store({ state, mutations, getters })
    wrapper = mount(PropertyFilter, { propsData, store, localVue })
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

  test('should have committed mutation "UPDATE_PROPERTY_FILTER_TYPE" to the store when rating changes', async () => {
    const input = wrapper.find('#p_townhouse_type')
    await input.setChecked(false)
    expect(mutations.UPDATE_PROPERTY_FILTER_TYPE).toHaveBeenCalledWith(store.state, ['House'])
  })

  test.each([
    ['UPDATE_PROPERTY_FILTER_ROOMS', '#p_rooms', '2'],
    ['UPDATE_PROPERTY_FILTER_BATHROOMS', '#p_bathrooms', '3'],
    ['UPDATE_PROPERTY_FILTER_CAR_SPACES', '#p_car_spaces', '2'],
    ['UPDATE_PROPERTY_FILTER_MAX_PRICE', '#p_max_price', '500000'],
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
