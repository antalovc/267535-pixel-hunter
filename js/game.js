import createQuestion from './create-question.js';

export default class Game {

  constructor(main, nLives, nQuestions) {
    this._livesTotal = nLives;
    this._questionsTotal = nQuestions;

    this._lives = nLives;
    this._questions = [createQuestion(() => {
      this._main.stepGame();
    })];
    this._main = main;
  }

  get livesTotal() {
    return this._livesTotal;
  }

  get lives() {
    return this._lives;
  }

  get currentQuestion() {
    return this._questions.length ? this._questions[this._questions.length - 1] : null;
  }

  step(isCorrect) {
    if (!isCorrect) {
      this._lives--;
    }
    this._questions.push = createQuestion(() => {
      this._main.stepGame();
    });
    return this;
  }

  isRunning() {
    return this._questions.length < this._questionsTotal && this._lives;
  }

}
