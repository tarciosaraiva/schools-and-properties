/**
 * @jest-environment jsdom
 */
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import { state } from '@/store'
import index from '@/pages/index.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('maplibre-gl', () => ({
  Map: () => {
    this.on = jest.fn()
    this.remove = jest.fn()
  }
}))

describe('index', () => {
  let wrapper;

  beforeEach(() => {
    const actions = { loadListings: jest.fn(), geocode: jest.fn() }
    const getters = {
      listings: jest.fn(),
      schoolsFilter: jest.fn(),
      locations: jest.fn()
    }

    const store = new Vuex.Store({ state, actions, getters })
    wrapper = shallowMount(index, { store, localVue })
  })

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly with props', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('assigns data to "flyToCenter" when invoked', () => {
    wrapper.vm.$emit('navigate', [1, 2])
    expect(wrapper.emitted().navigate).toBeTruthy()
  })

  test('set showAttributions to true when "openAttributions"', () => {
    wrapper.vm.openAttributions()
    expect(wrapper.vm.showAttributions).toBeTruthy()
  })

  test('set showAttributions to false when "closeAttributions"', () => {
    wrapper.vm.closeAttributions()
    expect(wrapper.vm.showAttributions).toBeFalsy()
  })

  test('set showAbout to true when "openAbout"', () => {
    wrapper.vm.openAbout()
    expect(wrapper.vm.showAbout).toBeTruthy()
  })

  test('set showAbout to false when "closeAbout"', () => {
    wrapper.vm.closeAbout()
    expect(wrapper.vm.showAbout).toBeFalsy()
  })

  test('set showPropertyFilter to true when "openPropertyFilter"', () => {
    wrapper.vm.openPropertyFilter()
    expect(wrapper.vm.showPropertyFilter).toBeTruthy()
  })

  test('set showPropertyFilter to false when "closePropertyFilter"', () => {
    wrapper.vm.closePropertyFilter()
    expect(wrapper.vm.showPropertyFilter).toBeFalsy()
  })

  test('set showSchoolFilter to true when "openSchoolFilter"', () => {
    wrapper.vm.openSchoolFilter()
    expect(wrapper.vm.showSchoolFilter).toBeTruthy()
  })

  test('set showSchoolFilter to false when "closeSchoolFilter"', () => {
    wrapper.vm.closeSchoolFilter()
    expect(wrapper.vm.showSchoolFilter).toBeFalsy()
  })
})
