export const setupWorker = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            Notification.requestPermission().then(console.log).catch(console.error)
        })
    }
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
    }).catch(e => console.log("no active service worker"))
}
