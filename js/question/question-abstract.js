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
    throw new Error(`Abstract method called`);
  }

  static get QuestionType() {
    return {
      TYPE_1: `two-of-two`,
      TYPE_2: `tinder-like`,
      TYPE_3: `one-of-three`
    };
  }

}

