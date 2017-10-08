const RESULT_CONFIGS = {
  POINTS_WHEN_LOST: -1,
  TIME_ANSWER_FAST: 10,
  TIME_ANSWER_SLOW: 20,
  POINTS_ANSWER_VALID: 100,
  POINTS_ANSWER_FAST: 50,
  POINTS_ANSWER_SLOW: -50,
  POINTS_LIVE_SPARE: 50,
  CORRECTS_TO_WIN: 10,
  MAX_LIVES: 3
};

const computeResult = (answers, spareLives) => {

  let result = 0;
  let nCorrect = 0;
  answers.forEach((answer) => {
    const isValid = answer.isValid();
    nCorrect += isValid ? 1 : 0;
    result += isValid ? RESULT_CONFIGS.POINTS_ANSWER_VALID : 0;
    result += isValid && answer.getTime() < RESULT_CONFIGS.TIME_ANSWER_FAST ? RESULT_CONFIGS.POINTS_ANSWER_FAST : 0;
    result += isValid && answer.getTime() > RESULT_CONFIGS.TIME_ANSWER_SLOW ? RESULT_CONFIGS.POINTS_ANSWER_SLOW : 0;
  });

  if (nCorrect < RESULT_CONFIGS.CORRECTS_TO_WIN) {
    return RESULT_CONFIGS.POINTS_WHEN_LOST;
  }

  result += spareLives * RESULT_CONFIGS.POINTS_LIVE_SPARE;

  return result;
};

export {computeResult, RESULT_CONFIGS};
