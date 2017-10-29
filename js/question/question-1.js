import QuestionBase from './question-base.js';

export default class Question1 extends QuestionBase {

  constructor(data) {
    super(data);

    this._subanswers = [null, null];
  }

  subanswer(nPicture, isPhoto) {
    this._subanswers[nPicture - 1] = this._pictures[nPicture - 1].isPhoto === isPhoto;

    if (this._subanswers.every((subanswer) => {
      return subanswer !== null;
    })) {
      this.answer(this._subanswers.every((subanswer) => {
        return subanswer;
      }));
    }
  }
}
