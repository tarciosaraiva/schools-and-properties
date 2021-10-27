import { shallowMount } from '@vue/test-utils'
import SchoolPopupContent from '@/components/SchoolPopupContent.vue'

describe('SchoolPopupContent', () => {
  const propsData = {
    school: {
      schoolName: 'school',
      overallScore: 95,
      englishScore: 4,
      mathsScore: 4,
      enrolments: 500,
      phoneNumber: '03 9999 8888',
    }
  }

  test('is a Vue instance', () => {
    const wrapper = shallowMount(SchoolPopupContent, { propsData })
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly with props', () => {
    const wrapper = shallowMount(SchoolPopupContent, { propsData })
    expect(wrapper).toMatchSnapshot()
  })
})
