import { mount } from '@vue/test-utils'
import SchoolPopupContent from '@/components/SchoolPopupContent.vue'

describe('SchoolPopupContent', () => {
  test('is a Vue instance', () => {
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

    const wrapper = mount(SchoolPopupContent, { propsData })
    expect(wrapper.vm).toBeTruthy()
  })
})
