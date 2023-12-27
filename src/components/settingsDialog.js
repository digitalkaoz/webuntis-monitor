import { store } from '../store.js'
import { html, reactive, w } from '@arrow-js/core'

export default (elem) => {
  const formData = reactive({
    school: '',
  })

  const submit = () => {
    store.school = formData.school
    store.showSettings = false
  }
  const close = () => store.showSettings = false

  html`
        <dialog>
            <a rel="nofollow" href="#" class="close" @click="${close}">x</a>
            <form @submit="${submit}" method="dialog">
                <label>Schule<input required value="${store.school}" @input="${(e) => { formData.school = e.target.value }}"></label>
                <button type="submit">Speichern</button>
            </form>
            <div>
                <a href="https://webuntis.com/" rel="nofollow" target="_blank" class="search-link">https://webuntis.com/</a>
            </div>
        </dialog>
    `(elem)

  w(() => store.school === undefined || store.showSettings, (v) => {
    if (v) {
      elem.querySelector('dialog').showModal()
    }
    else {
      elem.querySelector('dialog').close()
    }
  })
}
