export default class QuestionBase {

  constructor(data) {
    this._pictures = data.pictures;
    this._type = data.type;
    this._text = data.text;
  }

  get type() {
    return this._type;
  }

  get text() {
    return this._text;
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
      TYPE_1: `two-of-two`,
      TYPE_2: `tinder-like`,
      TYPE_3: `one-of-three`
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

