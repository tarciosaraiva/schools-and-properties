import { mount } from '@vue/test-utils'
import Modal from '~/components/Modal.vue'

// const localVue = createLocalVue()

describe('Modal', () => {
  let wrapper
  const closeFn = jest.fn()

  beforeEach(() => {
    const ModalTestComponent = {
      template: '<modal @close="close"></modal>',
      components: { Modal },
      methods: { close: closeFn }
    }

    wrapper = mount(ModalTestComponent)
  })


  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('emits "close" event when clicking on close button', () => {
    const button = wrapper.find('button')
    button.trigger('click')
    expect(closeFn).toHaveBeenCalled()
  })

  test('emits "close" event when sending escape key', () => {
    wrapper.trigger('keyup.esc')
    expect(closeFn).toHaveBeenCalled()
  })
})
