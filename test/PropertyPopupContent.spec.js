import { mount, createLocalVue } from '@vue/test-utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import PropertyPopupContent from '@/components/PropertyPopupContent.vue'

library.add(fas)
library.add(far)

const localVue = createLocalVue()
localVue.component('font-awesome-icon', FontAwesomeIcon)

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
    const wrapper = mount(PropertyPopupContent, { propsData, localVue })
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly with props', () => {
    const wrapper = mount(PropertyPopupContent, { propsData, localVue })
    expect(wrapper).toMatchSnapshot()
  })
})
