import createQuestion from './create-question.js';
import {Statistics} from './statistics.js';
import createTimer from './create-timer.js';

export default class Game {

  constructor(main, playerName, nLives, nQuestions) {
    this._livesTotal = nLives;
    this._questionsTotal = nQuestions;

    this._lives = nLives;


    this._timer = createTimer(() => {
      this.currentQuestion.answer = false;
    });

    this._answeredCallback = (isCorrect) => {
      if (!isCorrect) {
        this._lives--;
      }
      this.currentQuestion.answer.time = this._timer.timeElapsed;
      this._main.stepGame();
    };
    this._questions = [createQuestion(this._answeredCallback)];
    this._timer.start();
    this._statistics = null;

    this._main = main;
    this._playerName = playerName;
    this._finished = false;
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

  get statistics() {
    this._statistics = this._statistics || new Statistics(this);
    return this._statistics;
  }

  get playerName() {
    return this._playerName;
  }

  get timer() {
    return this._timer;
  }

  get hasNextQuestion() {
    return this._questions.length < this._questionsTotal && this._lives;
  }

  get isRunning() {
    return !this._finished && this._lives;
  }

  step() {
    this._questions.push(createQuestion(this._answeredCallback));
    this._timer.reset();
    this._timer.start();
    this.statistics.update();
    return this;
  }

  stop() {
    this._finished = true;
    this._timer.stop();
    this.statistics.update();
    return this;
  }


}
