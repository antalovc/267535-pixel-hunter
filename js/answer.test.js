import * as chai from 'chai';
// import * as mocha from 'gulp-mocha';
import Answer from './answer.js';

// mocha.setup(`tdd`);
const assert = chai.assert;
const strictEqual = assert.strictEqual;

const TESTING_TIME = 100;

describe(`"Answer" class test`, () => {

  it(`Testing class constructor`, () => {
    strictEqual((new Answer(true, 0)).isValid(), true, `valid answer should be created correctly`);
    strictEqual((new Answer(false, 0)).isValid(), false, `invalid answer should be created correctly`);
    strictEqual((new Answer(true, TESTING_TIME)).getTime(), TESTING_TIME, `answer time should be set correctly`);
  });

});

// mocha.run();
