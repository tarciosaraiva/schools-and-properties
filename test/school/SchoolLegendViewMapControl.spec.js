import { mount, createLocalVue } from '@vue/test-utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import SchoolLegendViewMapControl from '~/components/school/SchoolLegendViewMapControl.vue'

library.add(fas)

const localVue = createLocalVue()
localVue.component('FontAwesomeIcon', FontAwesomeIcon)

describe('SchoolLegendViewMapControl', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(SchoolLegendViewMapControl, { localVue })
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly when collapsed', () => {
    const wrapper = mount(SchoolLegendViewMapControl, { localVue })
    expect(wrapper).toMatchSnapshot()
  })

  test('renders correctly when expanded', async () => {
    const wrapper = mount(SchoolLegendViewMapControl, { localVue })
    await wrapper.setData({ collapsed: false })
    expect(wrapper).toMatchSnapshot()
  })

  test('should expand when clicking on caret button', () => {
    const wrapper = mount(SchoolLegendViewMapControl, { localVue })
    const button = wrapper.find('a')
    button.trigger('click')
    expect(wrapper.vm.collapsed).toBeFalsy()
  })
})
