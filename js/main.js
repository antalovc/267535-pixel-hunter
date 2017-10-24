import ScreenManager from './screen-manager.js';
import Game from './game.js';

const NUMBER_GAME_LIVES = 3;
const NUMBER_GAME_QUESTIONS = 10;

class Main {

  constructor() {
    this._game = null;
    this._screenManager = new ScreenManager(this);
    this._screenManager.setScreenIntro();
  }

  get game() {
    return this._game;
  }

  get isGameHasNextQuestion() {
    return (this._game && this._game.hasNextQuestion);
  }

  greet() {
    this._game = null;
    this._screenManager.setScreenGreeting();
  }

  prepare() {
    this._screenManager.setScreenRules();
  }

  startGame(playerName) {
    this._game = new Game(this, playerName, NUMBER_GAME_LIVES, NUMBER_GAME_QUESTIONS);
    this._screenManager.setScreenGame();
  }

  stepGame() {
    if (this.isGameHasNextQuestion) {
      this._game.step();
      this._screenManager.setScreenGame();
    } else {
      this._game.stop();
      this._screenManager.setScreenStats();
    }
  }

}

const main = new Main();

export default main;
