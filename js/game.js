import {Statistics} from './statistics.js';

const NUMBER_GAME_LIVES = 3;
const NUMBER_GAME_QUESTION = 10;

export default class Game {

  constructor(app, questions) {
    app.timer.callback = () => {
      this.currentQuestion.answer(false);
    };

    this._questions = questions;
    this._statistics = new Statistics();

    this._app = app;
    this._playerName = ``;
    this._answered = false;
  }

  get app() {
    return this._app;
  }

  static get livesTotal() {
    return NUMBER_GAME_LIVES;
  }

  static get questionsTotal() {
    return NUMBER_GAME_QUESTION;
  }

  get lives() {
    return this._statistics.lives;
  }

  get currentQuestion() {
    return this._questions[this._statistics.answers.length];
  }

  get statistics() {
    return this._statistics;
  }

  set playerName(playerName) {
    this._playerName = playerName;
  }

  get playerName() {
    return this._playerName;
  }

  get isRunning() {
    return this._statistics.answers.length < Game.questionsTotal && this._statistics.lives;
  }

  get state() {
    return {
      stats: this._statistics.answers,
      lives: this._statistics._lives,
      name: this._playerName
    };
  }

  set state(state) {
    this._statistics.answers = state.stats;
    this._statistics._lives = state.lives;
    this._playerName = state.name;
  }

  get results() {
    return {
      stats: this._statistics.answers,
      lives: this._statistics.lives
    };
  }

  get answered() {
    return this._answered;
  }

  answer(isCorrect, time) {
    if (!isCorrect) {
      this._statistics.burnLife();
    }
    this._statistics.answer(isCorrect, time);
    this._answered = true;
    this._app.stepGame();
  }

  step() {
    this._answered = false;
    this._statistics.update();
  }

  stop() {
    this._statistics.update(true);
  }

  reset() {
    this._statistics.reset();
    return this;
  }

}
