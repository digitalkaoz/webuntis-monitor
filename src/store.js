import {reactive, w, watch} from "@arrow-js/core";

import {dateFromIsoString, isoDateFromDate, isoDateFromNumberDate} from "./date.js";
import {getData} from "./api.js";
import {dateChooser} from "./components/dateChooser.js";

export const store = reactive({
    classes: [],
    currentClass: undefined,
    school: undefined,
    data: [],
    filteredData: [],
    emptyText: undefined,
    date: isoDateFromDate(new Date()),
    showSettings: false
})

store.$on('school', (school) => {
    if (!school) {
        return
    }

    storeKv('school', school)
    fetchData(new Date())
})

//TODO access to DOM or window shouldnt be here, instead store those vars inside the store and use reactive templates
store.$on('currentClass', (cls) => {
    storeKv('class', cls);
    window.location.hash = `class=${cls}`
})

store.$on('date', (d) => fetchData(dateFromIsoString(d)))

watch(() => {
    store.filteredData = store.data.filter(r => store.currentClass === undefined || r.class === store.currentClass)
    store.emptyText = store.filteredData.length === 0 ? `Keine Planänderung für ${store.currentClass ? `die ${store.currentClass}` : 'All'} am ${dateFromIsoString(store.date).toLocaleDateString([navigator.language])}.` : undefined
})

const fetchData = (d) => {
    getData(d)
        .then(initializeStore)
        .then(() => {
            dateChooser(document.getElementById('date'));
            document.getElementById('error').innerHTML = ""
        })
        .catch((e) => {
            console.error(e)
            document.getElementById('error').innerHTML = e.message
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