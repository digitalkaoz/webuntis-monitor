import {dataPayload} from "./webuntis.js";
import {dateToNumberDate} from "./date.js";
import {store} from "./store.js";

//const school = "hh5834";

const request = (url, payload) => {
    return fetch(url, {
        "headers": {
            "Content-Type": "application/json",
        },
        "body": JSON.stringify(payload),
        "method": "POST",
    })
        .then(r => r.json())
        .then(d => d.payload)
        ;
}
export const getMeta = () => {
    return request(`https://ikarus.webuntis.com/WebUntis/monitor/substitution/format?school=${store.school}`, {
        formatName: "SchülerInnen",
        schoolName: store.school
    })
}

export const getData = (date) => {
    return request(`https://ikarus.webuntis.com/WebUntis/monitor/substitution/data?school=${store.school}`, {
        ...dataPayload,
        "schoolName": store.school,
        "date": dateToNumberDate(date),
    })
}

