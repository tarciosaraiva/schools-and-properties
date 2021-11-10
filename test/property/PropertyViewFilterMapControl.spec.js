import { mount, createLocalVue } from '@vue/test-utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuex from 'vuex'

import { state, getters } from '@/store'
import PropertyViewFilterMapControl from '@/components/property/PropertyViewFilterMapControl.vue'

library.add(fas)

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('font-awesome-icon', FontAwesomeIcon)

describe('PropertyViewFilterMapControl', () => {
  const propsData = {
    openPropertyFilter: jest.fn()
  }

  let store
  let actions

  beforeEach(() => {
    actions = {
      loadListings: jest.fn()
    }
    store = new Vuex.Store({ state, getters, actions })
  })

  test('is a Vue instance', () => {
    const wrapper = mount(PropertyViewFilterMapControl, { propsData, store, localVue })
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly with props', () => {
    const wrapper = mount(PropertyViewFilterMapControl, { propsData, store, localVue })
    expect(wrapper).toMatchSnapshot()
  })

  test('should open property filter modal when clicking on settings button', () => {
    const wrapper = mount(PropertyViewFilterMapControl, { propsData, store, localVue })
    const links = wrapper.findAll('a')
    links.at(0).trigger('click')
    expect(propsData.openPropertyFilter).toHaveBeenCalled()
  })

  test('should refresh listing data when clicking on sync button', () => {
    const wrapper = mount(PropertyViewFilterMapControl, { propsData, store, localVue })
    const links = wrapper.findAll('a')
    links.at(1).trigger('click')
    expect(actions.loadListings).toHaveBeenCalled()
  })
})
