export default {
  functional: true,
  render (h, { children, props: { regex, invert } }) {
    const botRegex = regex || /bot|googlebot|crawler|spider|robot|crawling/i
    const isBot = process.server ? true : navigator.userAgent && botRegex.test(navigator.userAgent)
    const shouldShow = invert ? isBot : !isBot

    return h('div', {}, shouldShow ? children : [h('div')])
  }
}
