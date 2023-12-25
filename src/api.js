import {dateToNumberDate} from "./date.js";
import {store} from "./store.js";

export const getData = (date) => {
    return fetch(`/api/webuntis?school=${store.school}&date=${dateToNumberDate(date)}`)
        .then(r => r.json())
    ;
}

