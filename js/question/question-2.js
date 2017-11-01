import QuestionAbstract from './question-abstract.js';

export default class Question2 extends QuestionAbstract {

  constructor(data) {
    super(data);
  }

  subanswer(isPhoto) {
    this.answer(this._pictures[0].isPhoto === isPhoto);
  }
}
