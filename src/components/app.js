import settingsDialog from './settingsDialog.js'
import settingsButton from './settingsButton.js'
import classChooser from './classChooser.js'
import table from './table.js'
import dateChooser from './dateChooser.js'
import text from './text.js'
import notificationsDialog from "./notificationsDialog.js";
import { store } from '../store.js'

export default () => {
  settingsDialog(document.getElementById('settings'))
  settingsButton(document.getElementById('settings-button'))
  classChooser(document.getElementById('class'))
  table(document.querySelector('#table tbody'))
  dateChooser(document.getElementById('date'))
  notificationsDialog(document.getElementById('notifications'))
  text(document.getElementById('title'), () => store.title || 'WebUntis X')
  text(document.getElementById('updated'), () => store.lastUpdatedAt || false)
  text(document.getElementById('error'), () => store.error ? store.error.message : false)
}
