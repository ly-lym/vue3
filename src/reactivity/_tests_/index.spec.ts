import {describe, expect, test} from '@jest/globals';
import {add} from "../index";
describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
      expect(add(1, 2)).toBe(3);
    });
});