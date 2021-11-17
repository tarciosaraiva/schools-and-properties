import { mount, createLocalVue } from '@vue/test-utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import SchoolZoneLayersViewMapControl from '~/components/school/SchoolZoneLayersViewMapControl.vue'

library.add(fas)

const localVue = createLocalVue()
localVue.component('FontAwesomeIcon', FontAwesomeIcon)

describe('SchoolZoneLayersViewMapControl', () => {
  const propsData = {
    toggleLayer: jest.fn()
  }

  let wrapper

  beforeEach(() => {
    wrapper = mount(SchoolZoneLayersViewMapControl, { propsData, localVue })
  })

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly with props', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should toggle zone control when click on button', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.vm.collapsed).toBeFalsy()
    // click again to collapse
    await button.trigger('click')
    expect(wrapper.vm.collapsed).toBeTruthy()
  })

  test('should invoke "toggleLayer" when checkbox is clicked', async () => {
    const input = wrapper.findAll('input')
    await input.at(0).trigger('click')
    expect(propsData.toggleLayer).toHaveBeenCalledWith('primary')
  })
})
