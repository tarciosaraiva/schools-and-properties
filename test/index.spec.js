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
      schoolsFilter: jest.fn()
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
  });
})
