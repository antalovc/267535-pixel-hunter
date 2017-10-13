import Answer from './answer.js';

export default class Question {

  constructor(pictures) {
    this._pictures = pictures;
    this._answer = null;
    this._timer = null;
  }

  get answer() {
    return this._answer;
  }

  set answer(isCorrect) {
    this._answer = new Answer(isCorrect, 15);
  }

  getTimeLeft() {
    return this._timer.timeLeft;
  }

}

