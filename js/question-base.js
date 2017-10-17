import Answer from './answer.js';
import createTimer from './create-timer';

export default class QuestionBase {

  constructor(onAnsweredCallback) {
    // overwritable
    this._pictures = null;
    this._questionType = 0;

    this._answer = null;
    this._timer = createTimer();
    this._onAnsweredCallback = onAnsweredCallback;
  }

  get answer() {
    return this._answer;
  }

  set answer(isCorrect) {
    // A0 : currently set answer time to 15
    this._answer = new Answer(isCorrect, 15);
    this._onAnsweredCallback(isCorrect);
  }

  get questionType() {
    return this._questionType;
  }

  get pictures() {
    return this._pictures;
  }

  subanswer() {
    throw new Error(`Abstract method called`);
  }

  get timeLeft() {
    return this._timer.timeLeft;
  }

  static get QUESTION_TYPE() {
    return {
      TYPE_1: 1,
      TYPE_2: 2,
      TYPE_3: 3
    };
  }

  static get QUESTION_TYPES() {
    return [
      this.QUESTION_TYPE.TYPE_1,
      this.QUESTION_TYPE.TYPE_2,
      this.QUESTION_TYPE.TYPE_3
    ];
  }

  static get QUESTION_TYPE_TO_NPICTURES() {
    return {
      [this.QUESTION_TYPE.TYPE_1]: 2,
      [this.QUESTION_TYPE.TYPE_2]: 1,
      [this.QUESTION_TYPE.TYPE_3]: 3
    };
  }

}

