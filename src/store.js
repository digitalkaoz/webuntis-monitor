import {reactive, watch} from "@arrow-js/core";

import {dateFromIsoString, dateToNumberDate, isoDateFromDate, isoDateFromNumberDate} from "./date.js";
import {sendToWorker} from "./worker.js";

export const store = reactive({
    classes: [],
    currentClass: undefined,
    school: undefined,
    data: [],
    filteredData: [],
    emptyText: undefined,
    date: isoDateFromDate(new Date()),
    serverDate: undefined,
    showSettings: false,
    title: undefined,
    lastUpdatedAt: undefined,
    error: undefined,
})

store.$on('school', (school) => {
    storeKv('school', school)
    if (school) {
        fetchData(new Date())
    }
    sendToWorker(store.currentClass, store.school);
})

//TODO access to DOM or window shouldnt be here, instead store those vars inside the store and use reactive templates
store.$on('currentClass', (cls) => {
    storeKv('class', cls);
    if (window) {
        window.location.hash = `class=${cls}`
    }
    sendToWorker(store.currentClass, store.school);
})

store.$on('date', (d) => {
    if (d !== store.serverDate) {
        fetchData(dateFromIsoString(d));
    }
})

watch(() => {
    store.filteredData = store.data.filter(r => store.currentClass === undefined || r.class === store.currentClass)
    store.emptyText = store.filteredData.length === 0 ? `Keine Planänderung für ${store.currentClass ? `die ${store.currentClass}` : 'All'} am ${dateFromIsoString(store.date).toLocaleDateString([navigator.language])}.` : undefined
})

const fetchData = (d) => {
    getData(d)
        .then(initializeStore)
        .then(() => store.error = undefined)
        .catch((e) => {
            console.error(e)
            store.error = e
        })
}

const storeKv = (key, value) => {
    if (value === undefined) {
        localStorage.removeItem(key)
    } else {
        localStorage.setItem(key, value)
    }
}

const getKv = (name) => localStorage.getItem(name) || undefined;

export const initializeStore = (data) => {
    // classes
    const classes = data.classes
    if (store.currentClass && classes.indexOf(store.currentClass) === -1) {
        classes.push(store.currentClass)
    }

    store.classes = ["Alle", ...classes]
    store.title = data.customTitle
    store.lastUpdatedAt = data.lastUpdate
    store.serverDate = isoDateFromNumberDate(data.date)
    store.date = isoDateFromNumberDate(data.date)
    store.data = data.data
}

export const initializeState = () => {
    const hashParams = document.location.hash ? new URLSearchParams(document.location.hash.substring(1)) : []
    loadClass(hashParams)
    loadSchool(hashParams)
    sendToWorker(store.currentClass, store.school);
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

const getData = (date) => {
    return fetch(`${window.location.origin}/api/webuntis?school=${store.school}&date=${dateToNumberDate(date)}`)
        .then(r => {
            if (r.status >= 400) {
                throw new Error(r.statusText)
            }

            return r.json()
        });
}
