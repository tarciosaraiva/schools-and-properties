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

  let wrapper

  beforeEach(() => {
    wrapper = mount(SchoolViewFilterMapControl, { propsData, localVue })
  })

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly with props', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should open school filter modal when clickin on button', () => {
    const button = wrapper.find('button')
    button.trigger('click')
    expect(propsData.openSchoolFilter).toHaveBeenCalled()
  })
})
