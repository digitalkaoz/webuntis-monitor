import { expect, test, describe } from 'vitest'

import {
    dateFromIsoString,
    dateToNumberDate,
    isoDateFromDate,
    isoDateFromNumberDate,
    numberDateToDate
} from "../src/date.js";

describe('date utils', () => {
    const numberDate = 20240108;

    test('converts webuntis date to js date', () => {
        const d = numberDateToDate(numberDate);

        expect(d.getFullYear()).toBe(2024);
        expect(d.getMonth()).toBe(0);
        expect(d.getDate()).toBe(8);
    })

    test('converts js date to webuntis date', () => {
        const d = dateToNumberDate(new Date(2024, 0, 8))

        expect(d).toBe(numberDate)
    })

    test('iso string to date', () => {
        const d = dateFromIsoString('2024-01-08');

        expect(d.getFullYear()).toBe(2024);
        expect(d.getMonth()).toBe(0);
        expect(d.getDate()).toBe(8);
    })

    test('iso date from number date', () => {
        const d = isoDateFromNumberDate(numberDate)

        expect(d).toBe('2024-01-08')
    })

    test('iso date from date', () => {
        const d = isoDateFromDate(new Date(2024, 0, 8))

        expect(d).toBe('2024-01-08')
    })
})