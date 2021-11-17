import { mount, createLocalVue } from '@vue/test-utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import SchoolViewFilterMapControl from '~/components/school/SchoolViewFilterMapControl.vue'

library.add(fas)

const localVue = createLocalVue()
localVue.component('FontAwesomeIcon', FontAwesomeIcon)

describe('SchoolViewFilterMapControl', () => {
  const propsData = {
    openSchoolFilter: jest.fn()
  }

  test('is a Vue instance', () => {
    const wrapper = mount(SchoolViewFilterMapControl, { propsData, localVue })
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly with props', () => {
    const wrapper = mount(SchoolViewFilterMapControl, { propsData, localVue })
    expect(wrapper).toMatchSnapshot()
  })

  test('should open school filter modal when clickin on button', () => {
    const wrapper = mount(SchoolViewFilterMapControl, { propsData, localVue })
    const button = wrapper.find('a')
    button.trigger('click')
    expect(propsData.openSchoolFilter).toHaveBeenCalled()
  })
})
