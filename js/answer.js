const TIME_SLOW = 20; // seconds
const TIME_FAST = 10; // seconds

export default class Answer {

  static generateDescription(isCorrect, time) {
    let result = ``;
    if (!isCorrect) {
      result = Answer.ANSWER_DESCRIPTIONS.WRONG;
    } else if (Answer.isFast(time)) {
      result = Answer.ANSWER_DESCRIPTIONS.FAST;
    } else if (Answer.isSlow(time)) {
      result = Answer.ANSWER_DESCRIPTIONS.SLOW;
    } else {
      result = Answer.ANSWER_DESCRIPTIONS.CORRECT;
    }
    return result;
  }

  static isFast(time) {
    return time < TIME_FAST;
  }

  static isSlow(time) {
    return time > TIME_SLOW;
  }

  static get TIME_SLOW() {
    return Answer.TIME_SLOW;
  }

  static get TIME_FAST() {
    return Answer.TIME_FAST;
  }

  static get ANSWER_DESCRIPTIONS() {
    return {
      FAST: `fast`,
      CORRECT: `correct`,
      SLOW: `slow`,
      WRONG: `wrong`,
      UNKNOWN: `unknown`
    };
  }

}

