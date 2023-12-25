import {describe, test, expect} from "vitest";
import {store} from "../src/store.js";

describe('store', () => {

    // @vitest-environment happy-dom
    test('store in cookie', () => {
        document.cookie = ''
        store.school = 'foo';
        expect(document.cookie).toBe('school=foo')

        store.school = undefined;
        expect(document.cookie).toBe('school=')
    })

    // @vitest-environment happy-dom
    test('store in cookie with existing field', () => {
        document.cookie = ''
        store.school = 'foo';
        store.currentClass = '5c'

        expect(document.cookie).toBe('school=foo; class=5c')
    })

})