import { mount } from '@vue/test-utils'
import { renderToString } from '@vue/server-test-utils'
import VueIfBot from '../src'

const slotContent = '<div>I am the content</div>'

const mockUserAgent = userAgent => {
  Object.defineProperty(global.navigator, 'userAgent', { value: userAgent, configurable: true })
}

const testCanSeeOrNot = (can, wrapper) => {
  expect(wrapper.isVueInstance()).toBe(true)
  expect(wrapper.html()).toBe(`<div>${can ? slotContent : '<div></div>'}</div>`)
}

const testCanSee = curry(w => testCanSeeOrNot(true, w))
const testCanNotSee = curry(w => testCanSeeOrNot(false, w))

const testSsr = html => { expect(html).toBe(`<div data-server-rendered="true"><div></div></div>`) }

describe('VueIfBot', () => {
  afterEach(() => { mockUserAgent('Normal user here') })

  describe('csr', () => {
    describe('default', () => {
      it('is shown as human', () => {
        const wrapper = mount(VueIfBot, {
          attachToDocument: true,
          slots: {
            default: slotContent
          }
        })

        testCanSee(wrapper)
      })
      it('is hidden as bot', () => {
        mockUserAgent('bot')

        const wrapper = mount(VueIfBot, {
          attachToDocument: true,
          slots: {
            default: slotContent
          }
        })

        testCanNotSee(wrapper)
      })
    })
    describe('inverted', () => {
      it('is shown as bot', () => {
        mockUserAgent('bot')

        const wrapper = mount(VueIfBot, {
          attachToDocument: true,
          context: {
            props: {
              invert: true
            }
          },
          slots: {
            default: slotContent
          }
        })

        testCanSee(wrapper)
      })
      it('is hidden as human', () => {
        const wrapper = mount(VueIfBot, {
          attachToDocument: true,
          context: {
            props: {
              invert: true
            }
          },
          slots: {
            default: slotContent
          }
        })

        testCanNotSee(wrapper)
      })
    })

    describe('custom regex', () => {
      it('is shown as non-user', () => {
        mockUserAgent('bot')

        const wrapper = mount(VueIfBot, {
          attachToDocument: true,
          context: {
            props: {
              regex: /user/
            }
          },
          slots: {
            default: slotContent
          }
        })

        testCanSee(wrapper)
      })
      it('is hidden as user', () => {
        const wrapper = mount(VueIfBot, {
          attachToDocument: true,
          context: {
            props: {
              regex: /user/
            }
          },
          slots: {
            default: slotContent
          }
        })

        testCanNotSee(wrapper)
      })
    })
  })

  describe('ssr', () => {
    // You don't have the UA to check when on server-side. So just return nothing.
    beforeEach(() => {
      process.server = true
    })

    afterEach(() => {
      process.server = undefined
    })
    it('should render as human', () => {
      const wrapper = renderToString(VueIfBot, {
        slots: {
          default: slotContent
        }
      })

      testSsr(wrapper)
    })
    it('should render as bot', () => {
      mockUserAgent('bot')

      const wrapper = renderToString(VueIfBot, {
        slots: {
          default: slotContent
        }
      })

      testSsr(wrapper)
    })
  })
})

function curry (fn) {
  const arity = fn.length
  return function $curry (...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args)
    }
    // eslint-disable-next-line no-useless-call
    return fn.call(null, ...args)
  }
}
