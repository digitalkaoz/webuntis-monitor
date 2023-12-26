import {reactive} from "@arrow-js/core";

import {isoDateFromDate, isoDateFromNumberDate} from "./date.js";

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
    // classes
    const classes = data.classes
    if (store.currentClass && classes.indexOf(store.currentClass) === -1) {
        classes.push(store.currentClass)
    }
    store.classes = ["Alle", ...classes]

    // dates
    document.getElementById('updated').innerHTML = data.lastUpdate
    if (data.date) {
        store.date = isoDateFromNumberDate(data.date)
    }

    // rows
    store.data = data.data
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