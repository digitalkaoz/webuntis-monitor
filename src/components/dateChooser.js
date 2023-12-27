import {initializeStore, store} from "../store.js";
import {getData} from "../api.js";
import {dateFromIsoString} from "../date.js";

export const dateChooser = (elem) => {
    if (!elem.value) {
        elem.value = store.date;
    }

    elem.onchange = (e) => store.date = e.target.value;

}