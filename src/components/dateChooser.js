import {initializeStore, store} from "../store.js";
import {getData} from "../api.js";
import {dateFromIsoString} from "../date.js";

export const dateChooser = (elem) => {
    if (!elem.value) {
        elem.value = store.date;
    }

    elem.onchange = (e) => store.date = e.target.value;

    store.$on('date', (d) => {
        elem.value = d;
        getData(dateFromIsoString(d))
            .then(initializeStore)
            .catch(console.error)
    })
}