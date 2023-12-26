import {inject} from '@vercel/analytics';
import {w} from "@arrow-js/core";

import './style.css'
import {getData} from "./api.js";
import {initializeState, initializeStore, store} from "./store.js";

import {classChooser} from "./components/classChooser.js";
import {dateChooser} from "./components/dateChooser.js";
import {settingsDialog} from "./components/settingsDialog.js";
import {settingsButton} from "./components/settingsButton.js";
import {table} from "./components/table.js";

inject();
initializeState();

settingsDialog(document.getElementById('settings'));
settingsButton(document.getElementById('settings-button'))
classChooser(document.getElementById('class'))
table(document.querySelector('#table tbody'))

w(() => store.school, (school) => {
    if (!school) {
        return
    }

    getData(new Date())
        .then(initializeStore)
        .then(() => dateChooser(document.getElementById('date')))
        .catch(console.error)
})
