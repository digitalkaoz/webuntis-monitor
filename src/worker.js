import {store} from "./store.js";

export const setupWorker = () => {
    window.addEventListener('load', () => {
        if ('serviceWorker' in navigator) {
            sendToWorker(store.currentClass, store.school)
        }
    })
}

export const sendToWorker = (cls, school) => {
    if (!navigator.serviceWorker) {
        console.log("no active service worker")
        return
    }
    navigator.serviceWorker.getRegistration().then(sw => {
        if (sw.active) {
            sw.active.postMessage(JSON.stringify({
                cls: cls,
                school: school
            }))
        }
        sw.addEventListener("updatefound", () => {
            const installingWorker = sw.installing;
            installingWorker.onstatechange = () => {
                installingWorker.postMessage(JSON.stringify({
                    cls: cls,
                    school: school
                }))
            }
        });
    }).catch(e => console.log("no active service worker"))
}
