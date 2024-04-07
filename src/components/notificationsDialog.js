import { store } from '../store.js'
import { html, reactive, w } from '@arrow-js/core'

export default (elem) => {
  let state = reactive({
    granted: 'serviceWorker' in navigator ? Notification.permission : 'unavailable'
  })

  const allow = () => Notification.requestPermission().then(() => {
    console.info("notifications setup done.")
    state.granted = Notification.permission
  }).catch(console.error)

  html`${() => state.granted === 'default' ?
        html`<div>
            <a @click="${allow}">Push Nachrichten aktivieren?</a>
        </div>` : ''
    }`(elem)
}
