const TIME_SLOW = 20; // seconds
const TIME_FAST = 10; // seconds

export default class Answer {

  static generateDescription(isCorrect, time) {
    let result = ``;
    if (!isCorrect) {
      result = Answer.AnswerType.WRONG;
    } else if (Answer.isFast(time)) {
      result = Answer.AnswerType.FAST;
    } else if (Answer.isSlow(time)) {
      result = Answer.AnswerType.SLOW;
    } else {
      result = Answer.AnswerType.CORRECT;
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
    return TIME_SLOW;
  }

  static get TIME_FAST() {
    return TIME_FAST;
  }

  static get AnswerType() {
    return {
      FAST: `fast`,
      CORRECT: `correct`,
      SLOW: `slow`,
      WRONG: `wrong`,
      UNKNOWN: `unknown`
    };
  }

}

