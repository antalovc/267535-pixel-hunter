import ScreenRenderer from './screen-renderer.js';
import Game from './game.js';

const NUMBER_GAME_LIVES = 3;
const NUMBER_GAME_QUESTIONS = 10;

class Main {

  constructor() {
    this._game = null;
    this._screenRenderer = new ScreenRenderer(this);
    this._screenRenderer.setScreenIntro();
  }

  get game() {
    return this._game;
  }

  greet() {
    this._game = null;
    this._screenRenderer.setScreenGreeting();
  }

  prepare() {
    this._screenRenderer.setScreenRules();
  }

  startGame() {
    this._game = new Game(this, NUMBER_GAME_LIVES, NUMBER_GAME_QUESTIONS);
    this._screenRenderer.setScreenGame();
  }

  stepGame() {
    if (this.isGameRunning()) {
      this._game.step();
      this._screenRenderer.setScreenGame();
    } else {
      this._screenRenderer.setScreenStats();
    }
  }

  isGameRunning() {
    return (this._game && this._game.isRunning());
  }

}

const main = new Main();

export default main;
