import ScreensManager from './screens-manager.js';
import getScreenIntroConfig from './screen-intro.js';
import getScreenGreetingConfig from './screen-greeting.js';
import getScreenRulesConfig from './screen-rules.js';
import getScreenGame1Config from './screen-game-1.js';
import getScreenGame2Config from './screen-game-2.js';
import getScreenGame3Config from './screen-game-3.js';
import getScreenStatsConfig from './screen-stats.js';
import QuestionBase from './question-base.js';
import Game from './game.js';

const NUMBER_GAME_LIVES = 3;
const NUMBER_GAME_QUESTIONS = 10;

class Main {

  constructor() {
    this._game = null;
    this._gameScreensConfigs = {
      [QuestionBase.QUESTION_TYPE.TYPE_1]: getScreenGame1Config,
      [QuestionBase.QUESTION_TYPE.TYPE_2]: getScreenGame2Config,
      [QuestionBase.QUESTION_TYPE.TYPE_3]: getScreenGame3Config
    };
    ScreensManager.setCurrentConfig(getScreenIntroConfig(this));
  }

  get game() {
    return this._game;
  }

  greet() {
    this._game = null;
    ScreensManager.setCurrentConfig(getScreenGreetingConfig(this));
  }

  prepare() {
    ScreensManager.setCurrentConfig(getScreenRulesConfig(this));
  }

  startGame() {
    this._game = new Game(this, NUMBER_GAME_LIVES, NUMBER_GAME_QUESTIONS);
    ScreensManager.setCurrentConfig(this._gameScreensConfigs[this._game.currentQuestion.questionType](this));
  }

  stepGame() {
    if (this.isGameRunning()) {
      this._game.step();
      ScreensManager.setCurrentConfig(this._gameScreensConfigs[this._game.currentQuestion.questionType](this));
    } else {
      ScreensManager.setCurrentConfig(getScreenStatsConfig(this));
    }
  }

  isGameRunning() {
    return (this._game && this._game.isRunning());
  }

}

const main = new Main();

export default main;
