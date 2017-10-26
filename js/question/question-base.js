export default class QuestionBase {

  constructor() {
    this._pictures = null;
    this._questionType = 0;
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

  answer(isCorrect) {
    this.onAnswer(isCorrect);
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

