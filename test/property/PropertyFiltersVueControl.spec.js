import { mount, createLocalVue } from '@vue/test-utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuex from 'vuex'

import { state, getters } from '@/store'
import PropertyFiltersVueControl from '~/components/property/PropertyFiltersVueControl.vue'

library.add(fas)

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('FontAwesomeIcon', FontAwesomeIcon)

describe('PropertyFiltersVueControl', () => {
  let wrapper, store, actions, mutations, removeEventListenerSpy

  beforeEach(() => {
    actions = {
      loadListings: jest.fn()
    }

    mutations = {
      'UPDATE_PROPERTY_FILTER_TYPE': jest.fn(),
      'UPDATE_PROPERTY_FILTER_ROOMS': jest.fn(),
      'UPDATE_PROPERTY_FILTER_BATHROOMS': jest.fn(),
      'UPDATE_PROPERTY_FILTER_CAR_SPACES': jest.fn(),
      'UPDATE_PROPERTY_FILTER_MAX_PRICE': jest.fn(),
    }

    removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')

    store = new Vuex.Store({ state, getters, actions, mutations })
    wrapper = mount(PropertyFiltersVueControl, { store, localVue })
  })

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly when collapsed', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('renders correctly when expanded for "PropertyType"', async () => {
    await wrapper.setData({ collapsed: false, controlToShow: 'PropertyType' })
    expect(wrapper).toMatchSnapshot()
  })

  test('renders correctly when expanded for "Bedrooms"', async () => {
    await wrapper.setData({ collapsed: false, controlToShow: 'Bedrooms' })
    expect(wrapper).toMatchSnapshot()
  })

  test('renders correctly when expanded for "Bathrooms"', async () => {
    await wrapper.setData({ collapsed: false, controlToShow: 'Bathrooms' })
    expect(wrapper).toMatchSnapshot()
  })

  test('renders correctly when expanded for "CarSpaces"', async () => {
    await wrapper.setData({ collapsed: false, controlToShow: 'CarSpaces' })
    expect(wrapper).toMatchSnapshot()
  })

  test('renders correctly when expanded for "MaxPrice"', async () => {
    await wrapper.setData({ collapsed: false, controlToShow: 'MaxPrice' })
    expect(wrapper).toMatchSnapshot()
  })

  test('should display control once bath button is clicked', async () => {
    let expandedControl = wrapper.find('ul.layer-options.expanded')
    expect(expandedControl.exists()).toBe(false)

    const buttons = wrapper.findAll('button')
    await buttons.at(0).trigger('click')

    expandedControl = wrapper.find('ul.layer-options.expanded')
    expect(expandedControl.exists()).toBe(true)
  })

  test('should trigger listing query once confirm button is clicked', async () => {
    await wrapper.setData({ collapsed: false, controlToShow: 'PropertyType' })
    const buttons = wrapper.findAll('button')
    await buttons.at(6).trigger('click')

    expect(wrapper.vm.collapsed).toBe(true)
    expect(actions.loadListings).toHaveBeenCalled()
  })

  test('should have committed mutation to the store when value changes', async () => {
    await wrapper.setData({ propertyTypes: ['Unit'] })
    expect(mutations.UPDATE_PROPERTY_FILTER_TYPE).toHaveBeenCalledWith(store.state, ['Unit'])
  })

  test('should remove event listener when destroyed', () => {
    wrapper.destroy()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', wrapper.vm.handleClickOutside)
  })
})
