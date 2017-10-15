import createQuestion from './create-question.js';

export default class Game {

  constructor(main, nLives, nQuestions) {
    this._livesTotal = nLives;
    this._questionsTotal = nQuestions;

    this._lives = nLives;
    this._answeredCallback = (isCorrect) => {
      if (!isCorrect) {
        this._lives--;
      }
      this._main.stepGame();
    };
    this._questions = [createQuestion(this._answeredCallback)];
    this._main = main;
  }

  get livesTotal() {
    return this._livesTotal;
  }

  get questionsTotal() {
    return this._questionsTotal;
  }

  get livesTotal() {
    return this._livesTotal;
  }

  get lives() {
    return this._lives;
  }

  get questions() {
    return this._questions;
  }

  get currentQuestion() {
    return this._questions.length ? this._questions[this._questions.length - 1] : null;
  }

  step() {
    this._questions.push(createQuestion(this._answeredCallback));
    return this;
  }

  isRunning() {
    return this._questions.length <= this._questionsTotal && this._lives;
  }

}
