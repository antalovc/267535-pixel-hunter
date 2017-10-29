import assert from 'assert';
import Answer from './answer.js';

const strictEqual = assert.strictEqual;

suite(`"Answer" class test`, () => {

  test(`Testing class static methods`, () => {
    strictEqual(Answer.isSlow(Answer.TIME_SLOW + 1), true, `Slow time checker should return true on slow time`);
    strictEqual(Answer.isSlow(Answer.TIME_SLOW - 1), false, `Slow time checker should return false on slow time`);
    strictEqual(Answer.isFast(Answer.TIME_FAST - 1), true, `Fast time checker should return true on fast time`);
    strictEqual(Answer.isFast(Answer.TIME_FAST + 1), false, `Fast time checker should return true on slow time`);
  });

});
