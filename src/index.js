export default {
  functional: true,
  render (h, { children, slots, props: { regex, invert } }) {
    const dummyEl = h('div', {}, [])
    if (process.server) {
      return dummyEl
    }

    const botRegex = regex || /bot|googlebot|crawler|spider|robot|crawling/i
    const isBot = navigator.userAgent && botRegex.test(navigator.userAgent)
    const shouldShow = invert ? isBot : !isBot

    if (!shouldShow) {
      return dummyEl
    }

    return h('div', {}, slots().default)
  }
}
