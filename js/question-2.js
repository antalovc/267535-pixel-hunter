import QuestionBase from './question-base.js';
import getPictures from './data/get-data-dummy.js';

export default class Question2 extends QuestionBase {

  constructor(answeredCallback) {
    super(answeredCallback);

    this._questionType = QuestionBase.QUESTION_TYPE.TYPE_2;
    this._pictures = getPictures(this._questionType);
  }

  subanswer(isPhoto) {
    this.answer = this._pictures[0].isPhoto === isPhoto;
  }
}
