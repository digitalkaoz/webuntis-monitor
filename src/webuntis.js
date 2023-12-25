

export const dataPayload = {
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

export const getClassesFromResponse = (payload) => {
    if (!payload.affectedElements) {
        return [];
    }
    return payload.affectedElements["1"].map(c => c.split(' ')[0])
}