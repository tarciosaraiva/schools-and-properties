import { mount, createLocalVue } from '@vue/test-utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Navigate from '~/components/Navigate.vue'

library.add(fas)

const localVue = createLocalVue()
localVue.component('FontAwesomeIcon', FontAwesomeIcon)

const executeSearch = async (wrapper) => {
  const input = wrapper.find('#geo_go_to')
  input.setValue('my suburb')
  input.trigger('keyup')

  await wrapper.setProps({
    suggestions: [
      { name: 'my suburb', center: [1, 1], placeType: 'suburb' },
      { name: 'my other suburb', center: [2, 2], placeType: 'street' }
    ]
  })

  expect(wrapper.vm.search).toBe('my suburb')
  expect(wrapper.vm.isOpen).toBeTruthy()
}

describe('Navigate', () => {
  let wrapper
  let propsData

  beforeEach(() => {
    jest.useFakeTimers('modern')
    propsData = { searchCallback: jest.fn() }
    wrapper = mount(Navigate, { propsData, localVue })
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly without suggestions', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should trigger searchCallback when debounced', () => {
    const input = wrapper.find('#geo_go_to')
    input.setValue('my suburb')
    input.trigger('keyup')

    // debounce function should not have been triggered yet
    jest.advanceTimersByTime(200)
    expect(propsData.searchCallback).not.toHaveBeenCalled()

    // when 400ms have passed debounce function should have been triggered
    // and geolocate function is called and returned by now
    jest.advanceTimersByTime(200)
    expect(propsData.searchCallback).toHaveBeenCalledWith('my suburb')
  })

  test('renders correctly with suggestions', async () => {
    await executeSearch(wrapper)
    expect(wrapper).toMatchSnapshot()
  })

  test('should have loaded 2 suggestions', async () => {
    await executeSearch(wrapper)
    const suggestions = wrapper.findAll('.navigate-container .geo-suggestions .suggestion')
    expect(suggestions).toHaveLength(2)
  })

  test('should emit "navigate" event a suggestion is clicked', async () => {
    await executeSearch(wrapper)
    const suggestions = wrapper.findAll('.geo-suggestions .suggestion')
    suggestions.at(0).trigger('click')

    expect(wrapper.emitted().navigate).toBeTruthy()
  })

  test('should navigate with down arrow', async () => {
    await executeSearch(wrapper)
    const input = wrapper.find('#geo_go_to')
    await input.trigger('keyup.down')
    await input.trigger('keyup.down')
    const suggestion = wrapper.find('.navigate-container .geo-suggestions .is-active .suggestion')
    expect(suggestion.text()).toBe('my other suburb')
  })

  test('should navigate with up arrow', async () => {
    await executeSearch(wrapper)
    const input = wrapper.find('#geo_go_to')
    await input.trigger('keyup.down')
    await input.trigger('keyup.down')
    await input.trigger('keyup.up')
    const suggestion = wrapper.find('.navigate-container .geo-suggestions .is-active .suggestion')
    expect(suggestion.text()).toBe('my suburb')
  })

  test('should navigate with enter', async () => {
    await executeSearch(wrapper)
    const input = wrapper.find('#geo_go_to')
    await input.trigger('keyup.down')
    await input.trigger('keyup.down')
    await input.trigger('keyup.enter')

    expect(wrapper.emitted().navigate).toBeTruthy()
    expect(wrapper.vm.search).toBe('my other suburb')
    expect(wrapper.vm.isOpen).toBeFalsy()
  })
})
