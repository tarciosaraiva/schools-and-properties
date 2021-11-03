import { mount } from '@vue/test-utils'
import AttributionModal from '@/components/AttributionModal.vue'

describe('AttributionModal', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AttributionModal)
  })

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
