let school;
let cls;
let currentHash;

const showNotification = (date, title) => {
    self.registration.showNotification(title, {
        body: `Änderung am Vertretungsplan für die ${cls} am ${numberDateToDate(date).toLocaleDateString()}`,
        timestamp: Date.now(),
        icon: "./pwa-192x192.png",
        vibrate: [200, 100, 200, 100, 200, 100, 200],
    }).catch(console.error);
}

self.setInterval(() => {
    if (school) {
        fetch(`/api/webuntis?school=${school}&date=${dateToNumberDate(new Date())}`)
            .then(res => res.json())
            .then((data) => {
                const classes = filterClasses(data.data).map(hashableClass)
                const hash = (!classes || classes.length === 0) ? Promise.resolve(undefined) : hashString(JSON.stringify({
                    date: data.date,
                    classes: classes
                }))

                return Promise.all([
                    hash,
                    Promise.resolve(data.date),
                    Promise.resolve(data.customTitle)
                ])
            })
            .then(data => {
                if (data[0] !== undefined && data[0] !== currentHash) {
                    console.log("change detected sending notification")
                    currentHash = data[0];
                    showNotification(data[1], data[2])
                }
            })
            .catch(console.error);
    }
}, 3600 * 2); //every 2h

self.addEventListener('message', (event) => {
    try {
        const data = JSON.parse(event.data)
        if (data.school) {
            school = data.school
        }
        if (data.cls) {
            cls = data.cls
        }
    } catch (e) {
        console.log(event.data)
    }
})

const numberDateToDate = (number) => {
    const str = number.toString();
    const year = str.substring(0, 4)
    const month = str.substring(4, 6)
    const day = str.substring(6)

    return new Date(`${year}-${month}-${day} UTC`)
}

const dateToNumberDate = (date) => {
    return parseInt(`${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`)
}


const hashString = async function hashString(message) {
    const msgUint8 = new TextEncoder().encode(message);                                   // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);                   // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                             // convert buffer to byte array
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');         // convert bytes to hex string
}

const filterClasses = (data) => data.filter(r => cls === undefined || r.class === cls)
const hashableClass = (r) => {
    return {
        hour: r.hour,
        lecture: r.lecture,
        room: r.room,
        class: r.class,
        replacement: r.replacement
    }
}
