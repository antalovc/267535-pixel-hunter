import * as chai from 'chai';
//  import * as mocha from 'gulp-mocha';
import Answer from './answer.js';
import {computeResult, RESULT_CONFIGS} from './compute-result.js';

// mocha.setup(`tdd`);
const assert = chai.assert;
const strictEqual = assert.strictEqual;

const createAnswersArray = (n, validity, time) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(new Answer(validity, time));
  }
  return result;
};

describe(`"computeResult" function test`, () => {

  it(`Testing minimal amount of correct answers`, () => {
    strictEqual(computeResult(createAnswersArray(RESULT_CONFIGS.CORRECTS_TO_WIN - 1, false, 10), RESULT_CONFIGS.MAX_LIVES), RESULT_CONFIGS.POINTS_WHEN_LOST, `should return correct amount of points when there is too few correct answers`);
    assert(computeResult(createAnswersArray(RESULT_CONFIGS.CORRECTS_TO_WIN, true, 10), RESULT_CONFIGS.MAX_LIVES) > RESULT_CONFIGS.POINTS_WHEN_LOST, `should return correct amount of points when there is just enough correct answers`);
    assert(computeResult(createAnswersArray(RESULT_CONFIGS.CORRECTS_TO_WIN + 1, true, 10), RESULT_CONFIGS.MAX_LIVES) > RESULT_CONFIGS.POINTS_WHEN_LOST, `should return correct amount of points when there are more than enough correct answers`);
  });

  it(`Testing point computation`, () => {
    const nPointsForMaxLives = RESULT_CONFIGS.MAX_LIVES * RESULT_CONFIGS.POINTS_LIVE_SPARE;
    const nPointsForMaxMinus1Lives = (RESULT_CONFIGS.MAX_LIVES - 1) * RESULT_CONFIGS.POINTS_LIVE_SPARE;
    const nPointsAllFast = RESULT_CONFIGS.CORRECTS_TO_WIN * (RESULT_CONFIGS.POINTS_ANSWER_VALID + RESULT_CONFIGS.POINTS_ANSWER_FAST);
    const nPointsAllNormal = RESULT_CONFIGS.CORRECTS_TO_WIN * RESULT_CONFIGS.POINTS_ANSWER_VALID;
    const nPointsAllSlow = RESULT_CONFIGS.CORRECTS_TO_WIN * (RESULT_CONFIGS.POINTS_ANSWER_VALID + RESULT_CONFIGS.POINTS_ANSWER_SLOW);

    strictEqual(computeResult(createAnswersArray(RESULT_CONFIGS.CORRECTS_TO_WIN, true, RESULT_CONFIGS.TIME_ANSWER_FAST - 1), RESULT_CONFIGS.MAX_LIVES), nPointsAllFast + nPointsForMaxLives, `should return correct amount of points for ${RESULT_CONFIGS.CORRECTS_TO_WIN} fast answers with ${RESULT_CONFIGS.MAX_LIVES} lives`);
    strictEqual(computeResult(createAnswersArray(RESULT_CONFIGS.CORRECTS_TO_WIN, true, RESULT_CONFIGS.TIME_ANSWER_FAST + 1), RESULT_CONFIGS.MAX_LIVES), nPointsAllNormal + nPointsForMaxLives, `should return correct amount of points for ${RESULT_CONFIGS.CORRECTS_TO_WIN} normal answers with ${RESULT_CONFIGS.MAX_LIVES} lives`);
    strictEqual(computeResult(createAnswersArray(RESULT_CONFIGS.CORRECTS_TO_WIN, true, RESULT_CONFIGS.TIME_ANSWER_SLOW + 1), RESULT_CONFIGS.MAX_LIVES), nPointsAllSlow + nPointsForMaxLives, `should return correct amount of points for ${RESULT_CONFIGS.CORRECTS_TO_WIN} slow answers with ${RESULT_CONFIGS.MAX_LIVES} lives`);
    strictEqual(computeResult(createAnswersArray(RESULT_CONFIGS.CORRECTS_TO_WIN, true, RESULT_CONFIGS.TIME_ANSWER_FAST - 1), RESULT_CONFIGS.MAX_LIVES - 1), nPointsAllFast + nPointsForMaxMinus1Lives, `should return correct amount of points for ${RESULT_CONFIGS.CORRECTS_TO_WIN} fast answers with ${RESULT_CONFIGS.MAX_LIVES - 1} lives`);
    strictEqual(computeResult(createAnswersArray(RESULT_CONFIGS.CORRECTS_TO_WIN, true, RESULT_CONFIGS.TIME_ANSWER_FAST + 1), RESULT_CONFIGS.MAX_LIVES - 1), nPointsAllNormal + nPointsForMaxMinus1Lives, `should return correct amount of points for ${RESULT_CONFIGS.CORRECTS_TO_WIN} normal answers with ${RESULT_CONFIGS.MAX_LIVES - 1} lives`);
    strictEqual(computeResult(createAnswersArray(RESULT_CONFIGS.CORRECTS_TO_WIN, true, RESULT_CONFIGS.TIME_ANSWER_SLOW + 1), RESULT_CONFIGS.MAX_LIVES - 1), nPointsAllSlow + nPointsForMaxMinus1Lives, `should return correct amount of points for ${RESULT_CONFIGS.CORRECTS_TO_WIN} slow answers with ${RESULT_CONFIGS.MAX_LIVES - 1} lives`);
  });

});

// mocha.run();
