import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

import { mount, RouterLinkStub } from '@vue/test-utils'
import Header from '../../components/Header'

describe('Header.vue', () => {
  let wrapper

  beforeEach(() => {
    const options = { stubs: { NuxtLink: RouterLinkStub } }
    wrapper = mount(Header, options)
  })

  test('template test', () => {
    expect(wrapper.contains('header')).toBe(true)
  })
  test('ロゴ', () => {
    expect(wrapper.find(RouterLinkStub).text()).toBe('カフェペディア')
  })
})
