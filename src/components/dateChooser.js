import { store } from '../store.js'

export default (elem) => {
  if (!elem.value) {
    elem.value = store.date
  }

  elem.onchange = e => store.date = e.target.value
}
