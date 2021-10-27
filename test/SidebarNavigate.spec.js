import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import { state } from '@/store'
import SidebarNavigate from '@/components/SidebarNavigate.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SidebarNavigate', () => {
  let store
  let wrapper
  let propsData

  beforeEach(() => {
    jest.useFakeTimers('modern')

    propsData = { geocodeFn: jest.fn() }
    store = new Vuex.Store({ state })
    store.state.geocodeSuggestions = [
      { name: 'my suburb', center: [1, 1] },
      { name: 'my other suburb', center: [2, 2] }
    ]

    wrapper = shallowMount(SidebarNavigate, { propsData, store, localVue })
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly with props and store', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should trigger geocodeFn when debounced', () => {
    const input = wrapper.find('#geo_go_to')
    input.setValue('my suburb')
    input.trigger('keyup')

    // debounce function should not have been triggered yet
    jest.advanceTimersByTime(200)
    expect(propsData.geocodeFn).not.toHaveBeenCalled()

    // when 400ms have passed debounce function should have been triggered
    // and geolocate function is called and returned by now
    jest.advanceTimersByTime(200)
    expect(propsData.geocodeFn).toHaveBeenCalledWith('my suburb')
  })

  test('should have loaded 2 suggestions', () => {
    const suggestions = wrapper.findAll('.geo-suggestions .suggestion')
    expect(suggestions).toHaveLength(2)
  })

  test('should emit "navigate" event a suggestion is clicked', () => {
    const suggestions = wrapper.findAll('.geo-suggestions .suggestion')
    suggestions.at(0).trigger('click')

    expect(wrapper.emitted().navigate).toBeTruthy()
  });
})
