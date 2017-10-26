import QuestionBase from './question-base.js';
import getPictures from '../data/get-data-dummy.js';

export default class Question1 extends QuestionBase {

  constructor(answeredCallback) {
    super(answeredCallback);

    this._questionType = QuestionBase.QUESTION_TYPE.TYPE_1;
    this._pictures = getPictures(this._questionType);

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
