import Answer from '../answer.js';

export default class QuestionBase {

  constructor() {
    // overwritable
    this._pictures = null;
    this._questionType = 0;

    this._answer = null;
  }

  get answer() {
    return this._answer;
  }

  set answer(isCorrect) {
    this._answer = new Answer(isCorrect);
    this.onAnswer(isCorrect);
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

  onAnswer() {
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

