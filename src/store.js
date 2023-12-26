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

store.$on('school', (school) => storeKv('school', school))

store.$on('currentClass', (cls) => {
    storeKv('class', cls);
    window.location.hash = `class=${cls}`
})

const storeKv = (key, value) => {
    if (value === undefined) {
        localStorage.removeItem(key)
    } else {
        localStorage.setItem(key, value)
    }
}

const getKv = (name) => {
    return localStorage.getItem(name) || undefined
}

export const initializeStore = (data) => {
    // classes
    const classes = data.classes
    if (store.currentClass && classes.indexOf(store.currentClass) === -1) {
        classes.push(store.currentClass)
    }
    store.classes = ["Alle", ...classes]

    document.getElementById('title').innerHTML = data.customTitle
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
    // read from localstorage
    store.currentClass = getKv('class')

    // read from hash
    if (store.currentClass === undefined && window.location.hash && hash.has('class')) {
        store.currentClass = hash.get('class')
    }
}

const loadSchool = (hash) => {
    // read from local storage
    store.school = getKv('school');

    // read from hash
    if (store.school === undefined && window.location.hash && hash.has('school')) {
        store.school = hash.get('school')
    }
}