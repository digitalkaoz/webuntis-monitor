export const numberDateToDate = (number) => {
    const str = number.toString();
    const year = str.substring(0, 4)
    const month = str.substring(4, 6)
    const day = str.substring(6)

    return new Date(`${year}-${month}-${day} UTC`)
}
export const dateToNumberDate = (date) => {
    return parseInt(`${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`)
}

export const dateFromIsoString = (date) => {
    const [year, month, day] = date.split("-")
    return new Date(year, month - 1, day)
}

export const isoDateFromNumberDate = (d) => {
    const date = numberDateToDate(d)

    return date.toISOString().split('T')[0]
}

export const isoDateFromDate = (d) => {
    return d.toISOString().split('T')[0]
}
