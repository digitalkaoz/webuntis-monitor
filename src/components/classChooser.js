import { store } from '../store.js'
import { html } from '@arrow-js/core'

export default (elem) => {
  if (!elem.value) {
    elem.value = store.currentClass
  }

  html`
        ${() => store.classes.map(item => html`
            <option id="${item}" selected="${() => item === store.currentClass ? 'selected' : false}">${item}</option>`.key(item))}
    `(elem)

  elem.onchange = (e) => {
    const cls = e.target.value
    store.currentClass = cls === 'Alle' ? undefined : cls
  }
}
