import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import { state, getters } from '@/store'
import SchoolFilter from '~/components/school/SchoolFilter.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SchoolFilter', () => {
  let store
  let wrapper
  let propsData
  let mutations

  beforeEach(() => {
    propsData = { closeFn: jest.fn() }
    mutations = {
      'UPDATE_PLOT_PRIMARY_SCHOOLS': jest.fn(),
      'UPDATE_PLOT_SECONDARY_SCHOOLS': jest.fn(),
      'UPDATE_SCHOOL_EDUCATION_SECTOR': jest.fn(),
      'UPDATE_SCHOOL_PRIMARY_RATING': jest.fn(),
      'UPDATE_SCHOOL_SECONDARY_RATING': jest.fn(),
    }
    store = new Vuex.Store({ state, mutations, getters })
    wrapper = mount(SchoolFilter, { propsData, store, localVue })
  })

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly with props and store', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('education sector default value matches state', () => {
    const input = wrapper.find('#s_edu_sector')
    expect(input.element.value).toBe(store.state.filter.schools.educationSector)
  })

  test('overall rating default value match state', () => {
    const input = wrapper.find('#s_prim_rating')
    expect(Number(input.element.value)).toBe(store.state.filter.schools.primary.rating)
  })

  test('should have committed mutation "UPDATE_PLOT_PRIMARY_SCHOOLS" to the store when plotting option changes', async () => {
    const input = wrapper.find('#s_show_primary_schools')
    await input.setChecked(false)
    expect(mutations.UPDATE_PLOT_PRIMARY_SCHOOLS).toHaveBeenCalledWith(store.state, false)
  })

  test('should have committed mutation "UPDATE_PLOT_SECONDARY_SCHOOLS" to the store when plotting option changes', async () => {
    const input = wrapper.find('#s_show_secondary_schools')
    await input.setChecked(false)
    expect(mutations.UPDATE_PLOT_SECONDARY_SCHOOLS).toHaveBeenCalledWith(store.state, false)
  })

  test.each([
    ['UPDATE_SCHOOL_EDUCATION_SECTOR', '#s_edu_sector', 'NonGovernment'],
    ['UPDATE_SCHOOL_PRIMARY_RATING', '#s_prim_rating', '99'],
    ['UPDATE_SCHOOL_SECONDARY_RATING', '#s_sec_rating', '98'],
  ])(
    'should have committed mutation %p to the store when rating changes',
    (mutation, elementId, value) => {
      const input = wrapper.find(elementId)
      input.element.value = value
      input.trigger('change')

      expect(mutations[mutation]).toHaveBeenCalledWith(store.state, value)
    }
  )
})
