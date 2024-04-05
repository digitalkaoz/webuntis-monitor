
let school;
let cls;
let currentHash;

const numberDateToDate = (number) => {
    const str = number.toString();
    const year = str.substring(0, 4)
    const month = str.substring(4, 6)
    const day = str.substring(6)

    return new Date(`${year}-${month}-${day} UTC`)
}
const showNotification = (date) => {
    self.registration.showNotification("WebUntis Monitor", {
        body: `Änderung am Vertretungsplan für die ${cls} am ${numberDateToDate(date).toLocaleDateString()}`,
        timestamp: Date.now(),
        icon: "./pwa-192x192.png",
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        //tag: "vibration-sample",
    }).then(console.log).catch(console.error);
}

const hashString = async function hashString(message) {
    const msgUint8 = new TextEncoder().encode(message);                                   // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);                   // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                             // convert buffer to byte array
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');         // convert bytes to hex string
}
self.setInterval(() => {
    if (cls && school) {
        fetch(`/api/webuntis?school=${school}`)
            .then(res => res.json())
            .then((data) => {
                const classes = data.data.filter(r => r.class === cls).map(r => {
                    const d = {...r};
                    delete d["raw"];
                    return d
                })
                return Promise.all([hashString(JSON.stringify({
                    date: data.date,
                    classes: classes
                })),
                    Promise.resolve(data.date)
                ])
            })
            .then(data => {
                if (data[0] !== currentHash) {
                    currentHash = data[0];
                    showNotification(data[1])
                }
            })
            .catch(console.error);
    }
}, 5000);

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