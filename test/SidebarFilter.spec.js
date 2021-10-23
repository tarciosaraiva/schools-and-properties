import { mount } from '@vue/test-utils'
import SidebarFilter from '@/components/SidebarFilter.vue'

describe('SidebarFilter', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(SidebarFilter)
    expect(wrapper.vm).toBeTruthy()
  })
})
