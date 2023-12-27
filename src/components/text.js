import { html } from '@arrow-js/core'

export default (elem, data) => {
  html`
        ${data}
    `(elem)
}
