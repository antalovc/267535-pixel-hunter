import assert from 'assert';
import createTimer from './create-timer.js';

const strictEqual = assert.strictEqual;

const TIMING_TIMEOUT = 3; // seconds
const TIMING_MAX_DELAY = 3; // seconds
const TIMING_MSEC_TO_SEC = 1000;

const TIMING_TEST_MAX_DURATION = (TIMING_MAX_DELAY + TIMING_MAX_DELAY * 2) * TIMING_MSEC_TO_SEC;

suite(`"Timer" class test`, () => {

  test(`Testing class constructor`, () => {
    const timerObject = createTimer(null, TIMING_TIMEOUT);
    strictEqual(timerObject.timeLeft, TIMING_TIMEOUT, `timer should be created with timeout time set to ${TIMING_TIMEOUT}`);
    strictEqual(timerObject.timeElapsed, 0, `timer should be created with elapsed time set to 0`);
  });

  test(`Testing tick() function`, () => {
    const timerObject = createTimer(null, TIMING_TIMEOUT);
    timerObject.tick();
    strictEqual(timerObject.timeLeft, TIMING_TIMEOUT - 1, `timer should decrease its left time by 1 after tick`);
    strictEqual(timerObject.timeElapsed, 1, `timer should increase its elapsed time by 1 after tick`);
  });

  test(`Testing timings and callbacks`, (done) => {
    let ok = false;
    const timerObject = createTimer(null, TIMING_TIMEOUT, () => {
      ok = true;
    });
    timerObject.start();
    setTimeout(() => {
      try {
        strictEqual(ok, true, `timer should call the callback after it run out`);

        strictEqual(timerObject.timeLeft, 0, `timer should have left time set to left time of 0 seconds after it run out`);
        strictEqual(timerObject.timeElapsed, TIMING_TIMEOUT, `timer should have elapsed time set to timeout time of ${TIMING_TIMEOUT} seconds after after it run out`);

        timerObject.reset(TIMING_TIMEOUT);

        strictEqual(timerObject.timeLeft, TIMING_TIMEOUT, `timer should have left time set to timeout time of ${TIMING_TIMEOUT} seconds after reset`);
        strictEqual(timerObject.timeElapsed, 0, `timer should have elapsed time set to 0 seconds after reset`);

        done();
      } catch (e) {
        done(e);
      }
    }, (TIMING_TIMEOUT + TIMING_MAX_DELAY) * TIMING_MSEC_TO_SEC);
  }).timeout(TIMING_TEST_MAX_DURATION);

});

