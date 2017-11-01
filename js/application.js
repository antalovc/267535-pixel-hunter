import Header from './presenter/presenter-header.js';
import Footer from './presenter/presenter-footer.js';
import Intro from './presenter/presenter-intro.js';
import Greeting from './presenter/presenter-greeting.js';
import Rules from './presenter/presenter-rules.js';
import Question1 from './presenter/presenter-question-1.js';
import Question2 from './presenter/presenter-question-2.js';
import Question3 from './presenter/presenter-question-3.js';
import Stats from './presenter/presenter-stats.js';
import Notification from './presenter/presenter-notification.js';
import QuestionAbstract from './question/question-abstract.js';
import Game from './game.js';
import DataHandler from './data/data-handler.js';
import createTimer from './create-timer.js';

const HAS_HEADER = true;
const NO_HEADER = false;

const ROUTES_KEYS = {
  GREET: ``,
  RULES: `rules`
};

class Application {

  constructor() {
    this._gameData = null;

    this._header = null;
    this._footer = new Footer();
    this._viewContent = null;

    this._intro = null;
    this._greeting = null;
    this._rules = null;
    this._question1 = null;
    this._question2 = null;
    this._question3 = null;
    this._stats = null;
    this._notification = null;

    this._questionViews = {
      [QuestionAbstract.QUESTION_TYPE.TYPE_1]: () => {
        return this.question1;
      },
      [QuestionAbstract.QUESTION_TYPE.TYPE_2]: () => {
        return this.question2;
      },
      [QuestionAbstract.QUESTION_TYPE.TYPE_3]: () => {
        return this.question3;
      }
    };

    this._mainElement = document.querySelector(`main.central`);
    this._mainElement.innerHTML = ``;
    this._mainElement.appendChild(this._footer.element);

    this._game = null;
    this._timer = createTimer();

    const onHashChanged = () => {
      this.init(location.hash.replace(`#`, ``));
    };
    window.onhashchange = onHashChanged;
    onHashChanged();
  }

  // game getters part ===========================================

  get game() {
    return this._game;
  }

  get timer() {
    return this._timer;
  }

  // views getters part ==========================================

  get NO_HEADER() {
    return NO_HEADER;
  }

  get HAS_HEADER() {
    return HAS_HEADER;
  }

  get intro() {
    this._intro = this._intro ? this._intro : new Intro(this);
    return this._intro;
  }

  get greeting() {
    this._greeting = this._greeting ? this._greeting : new Greeting(this);
    return this._greeting;
  }
  get rules() {
    this._rules = this._rules ? this._rules : new Rules(this);
    return this._rules;
  }

  get question1() {
    this._question1 = this._question1 ? this._question1 : new Question1(this);
    return this._question1;
  }

  get question2() {
    this._question2 = this._question2 ? this._question2 : new Question2(this);
    return this._question2;
  }

  get question3() {
    this._question3 = this._question3 ? this._question3 : new Question3(this);
    return this._question3;
  }

  get stats() {
    this._stats = this._stats ? this._stats : new Stats(this);
    return this._stats;
  }

  get notification() {
    this._notification = this._notification ? this._notification : new Notification(this);
    return this._notification;
  }

  // routing part ================================================

  greet() {
    location.hash = ROUTES_KEYS.GREET;
  }

  prepare() {
    location.hash = ROUTES_KEYS.RULES;
  }

  startGame(name) {
    this._game.playerName = name;
    this.stepGame();
  }

  stepGame() {
    location.hash = this._game.state;
  }

  initUnknown() {
    this.doGreet();
  }

  initGreet() {
    if (this._gameData) {
      this.doGreet();
    } else {
      this.loadGameData(() => {
        this.doGreet();
      });
    }
  }

  initPrepare() {
    if (this._gameData) {
      this.doPrepare();
    } else {
      this.loadGameData(() => {
        this.doPrepare();
      });
    }
  }

  initGame(hash) {
    if (this._game) {
      this.doStepGame(hash);
    } else {
      this.loadGameData(() => {
        this.doStepGame(hash);
      });
    }
  }

  init(hash) {
    this._timer.reset();
    switch (hash) {
      case ROUTES_KEYS.GREET:
        this.initGreet();
        break;
      case ROUTES_KEYS.RULES:
        this.initPrepare();
        break;
      default:
        if (Game.checkState(hash)) {
          this.initGame(hash);
        } else {
          this.initUnknown();
        }
    }
  }

  // game part ===================================================

  tryNotify() {
    if (this._game.isRunning) {
      this.notification.init();
    } else {
      this.greet();
    }
  }

  doIntro() {
    this.intro.init(this);
  }

  doGreet() {
    this.greeting.init(this);
  }

  doPrepare() {
    if (this._game) {
      this._game.reset();
    } else {
      this._game = new Game(this, this._gameData);
    }
    this.rules.init(this);
  }

  doStepGame(hash) {
    this._game = this._game || new Game(this, this._gameData);
    this._game.state = hash;
    if (this._game.isRunning) {
      this._game.step();
      const presenter = this._questionViews[this._game.currentQuestion.type]();
      presenter.init(this);
    } else {
      this._game.stop();
      DataHandler.loadStatsData(this._game.playerName, (previousStatistics) => {
        this.stats.init(this, previousStatistics);
        DataHandler.saveStatsData(this._game.playerName, this._game.results);
      });
    }
  }

  setScreen(view, hasHeader) {
    const isHeaderShown = this._header && this._header.element.parentNode === this._mainElement;
    if (hasHeader && !isHeaderShown) {
      this._header = new Header(this);
      this._mainElement.insertBefore(this._header.element, this._mainElement.firstChild);
    } else if (hasHeader) {
      this._header.init(this);
    } else if (isHeaderShown) {
      this._mainElement.removeChild(this._header.element);
    }

    if (this._viewContent) {
      this._mainElement.removeChild(this._viewContent.element);
    }
    this._viewContent = view;
    this._mainElement.insertBefore(view.element, this._footer.element);
  }

  addNotification(view) {
    this._viewContent.element.insertAdjacentElement(`beforebegin`, view);
  }

  removeNotification(view) {
    this._mainElement.removeChild(view);
  }

  loadGameData(callback) {
    this.doIntro();
    DataHandler.loadGameData((data) => {
      this._gameData = data;
      callback();
    });
  }
}

export default new Application();
