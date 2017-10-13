import getPictures from './data/get-data-dummy.js';
import {getRandomArrayItem} from './util.js';
import Question from './question.js';

export default class Game {

  constructor(nLives, nQuestions) {
    this._livesTotal = nLives;
    this._questionsTotal = nQuestions;

    this._lives = nLives;
    this._questions = this.generateQuestions();
    this._currentQuestion = 0;
  }

  get livesTotal() {
    return this._livesTotal;
  }

  get lives() {
    return this._lives;
  }

  get currentQuestion() {
    return this._questions[this._currentQuestion];
  }

  generateQuestions() {
    const res = [];
    for (let i = 0; i < this._questionsTotal; i++) {
      res.push(new Question(getPictures(getRandomArrayItem([1, 2, 3]))));
    }
    return res;
  }

  step(isCorrect) {
    if (!isCorrect) {
      this._lives--;
    }
    this.currentQuestion.answer = isCorrect;
    this._currentQuestion++;
    return this;
  }

  isRunning() {
    return this._currentQuestion === this._questionsTotal - 1 && this._lives;
  }

}
