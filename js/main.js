import Application from './application.js';
import Game from './game.js';
import createTimer from './create-timer.js';

const NUMBER_GAME_LIVES = 3;
const NUMBER_GAME_QUESTIONS = 10;

class Main {

  constructor() {
    this._game = null;
    this._app = new Application(this);
    this._app.showIntro();
    this._timer = createTimer();
  }

  get game() {
    return this._game;
  }

  get isGameHasNextQuestion() {
    return (this._game && this._game.hasNextQuestion);
  }

  greet() {
    if (this._game) {
      this._game.stop();
    }
    this._game = null;
    this._app.showGreeting();
  }

  prepare() {
    this._app.showRules();
  }

  startGame(playerName) {
    this._game = new Game(this, playerName, NUMBER_GAME_LIVES, NUMBER_GAME_QUESTIONS);
    this._app.showGame();
  }

  stepGame() {
    if (this.isGameHasNextQuestion) {
      this._game.step();
      this._app.showGame();
    } else {
      this._game.stop();
      this._app.showStats();
    }
  }

  get timer() {
    return this._timer;
  }
}

const main = new Main();

export default main;
