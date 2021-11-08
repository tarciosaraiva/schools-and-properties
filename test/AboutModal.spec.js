import { mount } from '@vue/test-utils'
import AboutModal from '~/components/AboutModal.vue'

describe('AboutModal', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AboutModal, { propsData: { closeFn: jest.fn() } })
  })

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
