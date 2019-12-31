import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

import { mount, RouterLinkStub } from '@vue/test-utils'
import Footer from '../../components/Footer'

describe('Footer.vue', () => {
  let wrapper

  beforeEach(() => {
    const options = { stubs: { NuxtLink: RouterLinkStub } }
    wrapper = mount(Footer, options)
  })

test('template test', () => {
    expect(wrapper.find('strong').text()).toBe("SNS Share")
  })
test('SNS Twitter', () => {
    expect(wrapper.vm.sns_buttons.twitter.icon).toBe('fab fa-twitter')
    expect(wrapper.vm.sns_buttons.twitter.name).toBe('twitter')
    expect(wrapper.vm.sns_buttons.twitter.link).toMatch('https://twitter.com/intent/tweet?url=')
  })
test('SNS facebook', () => {
    expect(wrapper.vm.sns_buttons.facebook.icon).toBe('fab fa-facebook')
    expect(wrapper.vm.sns_buttons.facebook.name).toBe('facebook')
    expect(wrapper.vm.sns_buttons.facebook.link).toMatch('https://www.facebook.com/sharer/sharer.php?u=')
  })
  test('SNS line', () => {
    expect(wrapper.vm.sns_buttons.line.icon).toBe('fab fa-line')
    expect(wrapper.vm.sns_buttons.line.name).toBe('line')
    expect(wrapper.vm.sns_buttons.line.link).toMatch('https://line.me/R/msg/text/?')
  })
})
