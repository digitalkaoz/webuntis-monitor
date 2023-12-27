import {describe, test,expect} from "vitest";
import handler from "../api/webuntis.js";

describe('api', () => {
    test('it handles errors gracefully', async () => {
        const res = await handler({url: 'http://localhost/?school=hh5088&date=20140108'});

        expect(res.status).toBe(400)
    })
})