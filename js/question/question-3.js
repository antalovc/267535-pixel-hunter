import QuestionAbstract from './question-abstract.js';

export default class Question3 extends QuestionAbstract {

  constructor(data) {
    super(data);

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
    this.answer(this._pictures[nPicture - 1].isPhoto === this._isIntrusPhoto);
  }
}
