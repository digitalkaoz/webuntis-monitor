// Should run on edge runtime
export const config = {
    runtime: 'edge',
}

// Always add those header to this endpoint

const dataPayload = {
    "formatName": "SchülerInnen",
    "dateOffset": 0,
    "strikethrough": true,
    "mergeBlocks": true,
    "showOnlyFutureSub": true,
    "showBreakSupervisions": false,
    "showTeacher": true,
    "showClass": true,
    "showHour": true,
    "showInfo": true,
    "showRoom": true,
    "showSubject": true,
    "groupBy": 1,
    "hideAbsent": true,
    "departmentIds": [],
    "departmentElementType": -1,
    "hideCancelWithSubstitution": true,
    "hideCancelCausedByEvent": false,
    "showTime": true,
    "showSubstText": true,
    "showAbsentElements": [],
    "showAffectedElements": [1],
    "showUnitTime": true,
    "showMessages": true,
    "showStudentgroup": true,
    "enableSubstitutionFrom": true,
    "showSubstitutionFrom": 800,
    "showTeacherOnEvent": true,
    "showAbsentTeacher": false,
    "strikethroughAbsentTeacher": false,
    "activityTypeIds": [],
    "showEvent": false,
    "showCancel": false,
    "showOnlyCancel": false,
    "showSubstTypeColor": false,
    "showExamSupervision": false,
    "showUnheraldedExams": false
}

const getClassesFromResponse = (payload) => {
    if (!payload.affectedElements) {
        return [];
    }
    return payload.affectedElements["1"].map(c => c.split(' ')[0])
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

const request = (url, payload) => {
    return fetch(url, {
        "headers": {
            "Content-Type": "application/json",
        },
        "body": JSON.stringify(payload),
        "method": "POST",
    })
        .then(r => r.json())
        .then(d => d.payload)
        ;
}
const getMeta = (school) => {
    return request(`https://ikarus.webuntis.com/WebUntis/monitor/substitution/format?school=${school}`, {
        formatName: "SchülerInnen",
        schoolName: school
    })
}

const getData = (school, date) => {
    return request(`https://ikarus.webuntis.com/WebUntis/monitor/substitution/data?school=${school}`, {
        ...dataPayload,
        "schoolName": school,
        "date": date,
    })
}

export default async function handler(request) {
    const params = new URL(request.url).searchParams;

    try {
        const data = await getData(params.get('school'), params.get('date'))
        const meta = await getMeta(params.get('school'));

        return new Response(JSON.stringify({
            customTitle: meta.customTitle,
            lastUpdate: data.lastUpdate,
            date:data.date,
            classes: getClassesFromResponse(data),
            data: getDataFromResponse(data),
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        return new Response(e, {
            status: 400
        })
    }

}