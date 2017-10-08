import * as chai from 'chai';
// import * as mocha from 'gulp-mocha';
import Timer from './timer.js';

// mocha.setup(`tdd`);
const assert = chai.assert;

const timerObject = new Timer();
const TIMING_PERIOD = 3; // seconds
const TIMING_PERIOD_MAX_DELAY = 3; // seconds

describe(`"Timer" class test`, () => {

  it(`Testing class constructor`, () => {
    assert.equal(timerObject.getTime(), 0, `timer should be created with time set to 0`);
  });

  it(`Testing timings and resetting`, (done) => {
    timerObject.start();
    setTimeout(() => {
      try {
        timerObject.stop();
        assert(timerObject.getTime() > TIMING_PERIOD, `timer should count at least the expected time`);
        assert(timerObject.getTime() < TIMING_PERIOD + TIMING_PERIOD_MAX_DELAY, `timer should count at most the expected time plus delay of ${TIMING_PERIOD_MAX_DELAY} seconds`);
        timerObject.reset();
        assert.equal(timerObject.getTime(), 0, `timer should have time set to 0 after reset`);
        done();
      } catch (e) {
        done(e);
      }
    }, TIMING_PERIOD * 1000);
  });

});

// mocha.run();
