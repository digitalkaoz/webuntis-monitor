import './style.css'
import {getData, getMeta} from "./api.js";
import {initializeState, initializeStore, store} from "./store.js";
import {isoDateFromNumberDate} from "./date.js";

import {classChooser} from "./components/classChooser.js";
import {dateChooser} from "./components/dateChooser.js";
import {settingsDialog} from "./components/settingsDialog.js";
import {settingsButton} from "./components/settingsButton.js";
import {table} from "./components/table.js";
import {w} from "@arrow-js/core";

initializeState();

settingsDialog(document.getElementById('settings'));
settingsButton(document.getElementById('settings-button'))

w(() => store.school, (school) => {
    if (!school) {
        return
    }

    Promise.all([
        getMeta()
            .then(d => {
                //console.log(d)
                document.getElementById('title').innerHTML = d.customTitle
            }),
        getData(new Date())
            .then((data) => {
                initializeStore(data)
                document.getElementById('updated').innerHTML = data.lastUpdate

                // use nextDate
                if (data.date) {
                    store.date = isoDateFromNumberDate(data.date)
                }

                //console.log(data)
                classChooser(document.getElementById('class'))
                dateChooser(document.getElementById('date'))
                table(document.querySelector('#table tbody'))
            })
    ]).catch(console.error)

})
