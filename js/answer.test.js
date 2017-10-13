import assert from 'assert';
import Answer from './answer.js';

const strictEqual = assert.strictEqual;

const TESTING_TIME = 100;

suite(`"Answer" class test`, () => {

  test(`Testing class constructor`, () => {
    strictEqual((new Answer(true, 0)).isCorrect, true, `valid answer should be created correctly`);
    strictEqual((new Answer(false, 0)).isCorrect, false, `invalid answer should be created correctly`);
    strictEqual((new Answer(true, TESTING_TIME)).time, TESTING_TIME, `answer time should be set correctly`);
  });

});
