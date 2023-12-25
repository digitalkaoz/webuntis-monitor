import {reactive} from "@arrow-js/core";

import {getClassesFromResponse} from "./webuntis.js";
import {isoDateFromDate} from "./date.js";

export const store = reactive({
    classes: [],
    currentClass: undefined,
    school: undefined,
    data: [],
    date: isoDateFromDate(new Date()),
    showSettings: false
})

store.$on('school', (school) => storeInCookie('school', school))

store.$on('currentClass', (cls) => {
    storeInCookie('class', cls);
    window.location.hash = `class=${cls}`
})

const storeInCookie = (key, value) => {
    document.cookie = `${key}=${value !== undefined ? value : ''};`
}

const getCookie = (name) => {
    return (document.cookie ? document.cookie.split(';') : []).find(c => c.trim().startsWith(name))
}

export const initializeStore = (data) => {
    const classes = getClassesFromResponse(data)
    if (store.currentClass && classes.indexOf(store.currentClass) === -1) {
        classes.push(store.currentClass)
    }

    store.classes = ["Alle", ...classes]
    store.data = getDataFromResponse(data)
}

export const initializeState = () => {
    const hashParams = document.location.hash ? new URLSearchParams(document.location.hash.substring(1)) : []
    loadClass(hashParams)
    loadSchool(hashParams)
}

const loadClass = (hash) => {
    // read from cookie
    const clsCookie = getCookie('class')
    if (clsCookie) {
        store.currentClass = clsCookie.trim().replace('class=', '') || undefined
        return
    }

    // read from hash
    if (window.location.hash && hash.has('class')) {
        store.currentClass = hash.get('class')
    }
}

const loadSchool = (hash) => {
    // read from cookie
    const schoolCookie = getCookie('school');
    if (schoolCookie) {
        store.school = schoolCookie.trim().replace('school=', '')
        return
    }

    // read from hash
    if (window.location.hash && hash.has('school')) {
        store.school = hash.get('school')
    }
}

const getDataFromResponse = (data) => {
    return data.rows.map((r) => ({
        class: r.group.split(' ')[0],
        hour: r.data[0],
        timeRange: r.data[1],
        lecture: r.data[2],
        id: r.data[3] + r.data[0],
        replacement: r.data[4],
        room: r.data[5],
        teacher: r.data[6],
        info: r.data[7],
        comment: r.data[8],
        raw: r
    }))
}
