import { shallowMount } from '@vue/test-utils'
import SchoolPopupContent from '@/components/SchoolPopupContent.vue'

describe('SchoolPopupContent', () => {
  const propsData = {
    school: {
      schoolName: 'school',
      primaryOverallScore: 95,
      primaryEnglishScore: 4,
      primaryMathsScore: 4,
      primaryEnrolments: 500,
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
