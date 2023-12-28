import { store } from '../store.js'

export default (elem) => {
  if (!elem.value) {
    elem.value = store.date
  }

  store.$on('date', (v) => elem.value = v)

  elem.onchange = e => store.date = e.target.value
}
