# VueIfBot - Hide stuff from bots (especially cookie consents) :no_entry_sign::eyes:

<p align="center">
  <a href="https://travis-ci.com/Developmint/vue-if-bot"><img src="https://travis-ci.com/Developmint/vue-if-bot.svg?branch=master" alt="Build Status"></a>
  <a href="https://codecov.io/gh/Developmint/vue-if-bot"><img src="https://codecov.io/gh/Developmint/vue-if-bot/branch/master/graph/badge.svg" alt="Code coverage"></a>
  <a href="https://www.npmjs.com/package/vue-if-bot"><img src="https://img.shields.io/npm/dm/vue-if-bot.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-if-bot"><img src="https://img.shields.io/npm/v/vue-if-bot.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue-if-bot"><img src="https://img.shields.io/npm/l/vue-if-bot.svg" alt="License"></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="We use Conventional Commits"></a>
</p>

> Lightweight component to hide/show content to clients based on the user agent

## :interrobang: Why this component exists

As you know, the GDPR is coming (or more likely: is already applicable when you read this).
With it, a lot of information banners, consents concerning cookies, privacy policies and so on.

The average user will see those banners once (a year, that's the law), but search engine crawlers
will always see it (as they don't have any cookies and won't click on it). On **every page**.
Depending on the screen size they take, this could be annoying and even influence your SEO (negatively).

So **stop it now!** With **VueIfBot**.

Having any other cases you need this component? Feel free to share!

## :fire:  Features

- **Tiny functional component**
- SSR-safe (works with Nuxt.js)
- Well tested and **documented**
- Compatible with Node 8.0+
- Vue as the only dependency
- Highly customizable

## :mag_right: Getting started


### :package: Through NPM

```
$ npm install vue-if-bot
```

#### Synchronous import

```js
import VueIfBot from 'vue-if-bot'

export default {
  components: {
    VueIfBot
  }
}

```

#### Async import

```js
export default {
  components: {
    VueIfBot: () => import('vue-if-bot')
  }
}

```

### :link: Using a CDN

[UNPKG](https://unpkg.com/vue-if-bot/dist/) | [jsDelivr](https://cdn.jsdelivr.net/npm/vue-if-bot/dist/) (available as window.ifBot)

```js
Vue.component('if-bot', window.ifBot)

// Continue as you wish

```

## :hammer_and_wrench: Usage

### Handling

By default, all children of the component are **not** displayed to bots.
VueIfBot detects bots by testing their user agent against the regex `/bot|googlebot|crawler|spider|robot|crawling/i`

### Prop overview


| Prop   |   Type  | Comment |
| ---    |   ---   | ---   |
| invert | Boolean | Inverts the behavior (shows content **only to bots**)|
| regex  | RegExp  | Change the user agent regex to your own (eg `/test/i`)|


### Example usage

```js
 <vue-if-bot>
   <h1>This will not be visible for bots</h1>
 </vue-if-bot>

 <vue-if-bot
    :invert="true">
    <h1>This will be visible for bots</h1>
  </vue-if-bot>

  <vue-if-bot
     :regex="/some-custom-browser/">
     <h1>This will be visible for users whose user agent contains some-custom-browser</h1>
   </vue-if-bot>
```
## :gear: Contributing

Please see our [CONTRIBUTING.md](./CONTRIBUTING.md)


## :bookmark_tabs: License

[MIT License](./LICENSE.md) - Copyright (c) Developmint - Alexander Lichter
