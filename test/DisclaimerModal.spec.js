import { mount } from '@vue/test-utils'
import DisclaimerModal from '@/components/DisclaimerModal.vue'

describe('DisclaimerModal', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(DisclaimerModal)
  })

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
