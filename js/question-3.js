import QuestionBase from './question-base.js';
import getPictures from './data/get-data-dummy.js';

export default class Question3 extends QuestionBase {

  constructor(answeredCallback) {
    super(answeredCallback);

    this._questionType = QuestionBase.QUESTION_TYPE.TYPE_3;
    this._pictures = getPictures(this._questionType);
    this._isIntrusPhoto = this._pictures.reduce((nPhotos, picture) => {
      if (picture.isPhoto) {
        nPhotos++;
      }
      return nPhotos;
    }, 0) === 1;
  }

  get isIntrusPhoto() {
    return this._isIntrusPhoto;
  }

  subanswer(nPicture) {
    this.answer = this._pictures[nPicture - 1].isPhoto === this._isIntrusPhoto;
  }
}
