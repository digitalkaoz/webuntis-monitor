import {store} from "./store.js";

export const setupWorker = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            Notification.requestPermission().then(console.log).catch(console.error)
            sendToWorker(store.currentClass, store.school)
        })
    }
}

export const sendToWorker = (cls, school) => {
    navigator.serviceWorker.getRegistration().then(sw => {
        if (sw.active) {
            sw.active.postMessage(JSON.stringify({
                cls: cls,
                school: school
            }))
        }
    }).catch(e => console.log("no active service worker"))
}
