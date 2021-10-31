import { mount } from '@vue/test-utils'
import PropertyPopupContent from '@/components/PropertyPopupContent.vue'

describe('PropertyPopupContent', () => {
  const propsData = {
    property: {
      price: 'AUD 900K',
      media: ['https://my.image/1.png'],
      displayableAddress: '1 My Street, My Suburb',
      features: ['f1', 'f2'],
      bedrooms: 2,
      bathrooms: 2,
      carspaces: 2,
      landArea: 200,
      listingSlug: 'my-property-slug',
    }
  }

  test('is a Vue instance', () => {
    const wrapper = mount(PropertyPopupContent, { propsData })
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly with props', () => {
    const wrapper = mount(PropertyPopupContent, { propsData })
    expect(wrapper).toMatchSnapshot()
  })
})
