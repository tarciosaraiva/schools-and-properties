import { mount } from '@vue/test-utils'
import SchoolPopupContent from '~/components/school/SchoolPopupContent.vue'

describe('SchoolPopupContent', () => {
  const propsData = {
    school: {
      educationSector: 'Government',
      schoolType: 'Primary',
      schoolName: 'school',
      primaryOverallScore: 95,
      primaryEnglishScore: 4,
      primaryMathsScore: 4,
      primaryEnrolments: 500,
      phoneNumber: '03 9999 8888',
      secondaryOverallScore: '#N/A',
    }
  }

  test('is a Vue instance', () => {
    const wrapper = mount(SchoolPopupContent, { propsData })
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly with props', () => {
    const wrapper = mount(SchoolPopupContent, { propsData })
    expect(wrapper).toMatchSnapshot()
  })

  test('renders correctly with props and secondary school', () => {
    const propsData = {
      school: {
        educationSector: 'Government',
        schoolType: 'Pri/Sec',
        schoolName: 'school',
        primaryOverallScore: 95,
        primaryEnglishScore: 4,
        primaryMathsScore: 4,
        primaryEnrolments: 500,
        phoneNumber: '03 9999 8888',
        secondaryOverallScore: 96,
        secondaryEnglishScore: 3,
        secondaryMathsScore: 4,
        secondaryEnrolments: 200,
      }
    }
    const wrapper = mount(SchoolPopupContent, { propsData })
    expect(wrapper).toMatchSnapshot()
  })

  test('renders correctly with props and secondary school only', () => {
    const propsData = {
      school: {
        educationSector: 'Independent',
        schoolType: 'Secondary',
        schoolName: 'school',
        primaryOverallScore: '#N/A',
        primaryEnglishScore: '#N/A',
        primaryMathsScore: '#N/A',
        primaryEnrolments: '#N/A',
        phoneNumber: '03 9999 8888',
        secondaryOverallScore: 96,
        secondaryEnglishScore: 3,
        secondaryMathsScore: 4,
        secondaryEnrolments: 200,
      }
    }
    const wrapper = mount(SchoolPopupContent, { propsData })
    expect(wrapper).toMatchSnapshot()
  })
})
