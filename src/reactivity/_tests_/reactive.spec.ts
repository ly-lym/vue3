import {describe, expect, test} from '@jest/globals';
import { reactive } from "../reactive";

describe('reactive',()=>{
    test("path", ()=>{
        const original = {foo:1};
        const observed = reactive(original);
        expect(observed).not.toBe(original);
        expect(observed.foo).toBe(1);
    })
})