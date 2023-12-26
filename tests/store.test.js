import {describe, test, expect} from "vitest";
import {store} from "../src/store.js";

describe('store', () => {

    // @vitest-environment happy-dom
    test('store in kv', () => {
        store.school = 'foo';
        expect(localStorage.getItem('school')).toBe('foo')

        store.school = undefined;
        expect(localStorage.getItem('school')).toBe(null)
    })
})