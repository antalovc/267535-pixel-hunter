import QuestionBase from './question-base.js';

export default class Question2 extends QuestionBase {

  constructor(data) {
    super(data);
  }

  subanswer(isPhoto) {
    this.answer(this._pictures[0].isPhoto === isPhoto);
  }
}
