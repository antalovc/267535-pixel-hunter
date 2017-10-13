import ScreensManager from './screens-manager.js';
import getScreenIntroConfig from './screen-intro.js';
import getScreenGreetingConfig from './screen-greeting.js';
import getScreenRulesConfig from './screen-rules.js';
// import getScreenGame1Config from './screen-game-1.js';
// import getScreenGame2Config from './screen-game-2.js';
// import getScreenGame3Config from './screen-game-3.js';
// import getScreenStatsConfig from './screen-stats.js';
import Game from './game.js';

const NUMBER_GAME_LIVES = 3;
const NUMBER_GAME_QUESTIONS = 10;

class Main {

  constructor() {
    this._game = null;
    ScreensManager.setCurrentConfig(getScreenIntroConfig(this));
  }

  greet() {
    this._game = null;
    ScreensManager.setCurrentConfig(getScreenGreetingConfig(this));
  }

  prepare() {
    ScreensManager.setCurrentConfig(getScreenRulesConfig(this));
  }

  startGame() {
    this._game = new Game(NUMBER_GAME_LIVES, NUMBER_GAME_QUESTIONS);
    // ScreensManager.setCurrentConfig(getScreenGreetingElement);
  }

  // stepGame() {
  //   this._game.step();
  //   //ScreensManager.setCurrentConfig(getScreenGreetingElement);
  // }

  // isGameRunning() {
  //   return (this._game && this._game.isRunning());
  // }

}

const main = new Main();

export default main;
