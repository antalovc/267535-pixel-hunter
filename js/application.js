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
import StateAdapter from './state-adapter.js';
import {crossFade} from "./util.js";

const HAS_HEADER = true;
const NO_HEADER = false;

const RouteKey = {
  GREET: ``,
  RULES: `rules`,
};

class Application {

  constructor() {
    this._gameData = null;
    this._stateAdapter = new StateAdapter();

    this._header = null;
    this._footer = new Footer();
    this._view = null;

    this._intro = null;
    this._greeting = null;
    this._rules = null;
    this._question1 = null;
    this._question2 = null;
    this._question3 = null;
    this._stats = null;
    this._notification = null;

    this._questionViews = {
      [QuestionAbstract.QuestionType.TYPE_1]: () => {
        return this.question1;
      },
      [QuestionAbstract.QuestionType.TYPE_2]: () => {
        return this.question2;
      },
      [QuestionAbstract.QuestionType.TYPE_3]: () => {
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

  get header() {
    this._header = this._header ? this._header : new Header(this);
    return this._header;
  }

  // routing part ================================================

  greet() {
    location.hash = RouteKey.GREET;
  }

  prepare() {
    location.hash = RouteKey.RULES;
  }

  startGame(name) {
    this._game.name = name;
    this.stepGame();
  }

  stepGame() {
    location.hash = StateAdapter.getStateHash(this._game.state);
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

  initGame(state) {
    if (this._game) {
      this.doStepGame(state);
    } else {
      this.loadGameData(() => {
        this.doStepGame(state);
      });
    }
  }

  initStats(state) {
    this._game = null;
    this.doFinish(state.name);
  }

  init(hash) {
    this._timer.reset();
    switch (hash) {
      case RouteKey.GREET:
        this.initGreet();
        break;
      case RouteKey.RULES:
        this.initPrepare();
        break;
      default:
        this._stateAdapter.init(hash);
        if (this._stateAdapter.isGameState()) {
          this.initGame(this._stateAdapter.state);
        } else if (this._stateAdapter.isStatsState()) {
          this.initStats(this._stateAdapter.state);
        } else {
          this.initUnknown();
        }
    }
  }

  // game part ===================================================

  tryNotify() {
    if (this. _game && this._game.isRunning) {
      this.notification.init();
    } else {
      this.greet();
    }
  }

  doIntro() {
    this.intro.init(this);
  }

  doGreet() {
    if (this._game) {
      this._game.reset();
    }
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

  doStepGame(state) {
    this._game = this._game || new Game(this, this._gameData);
    this._game.state = state;
    if (this._game.isRunning) {
      this._game.step();
      const presenter = this._questionViews[this._game.currentQuestion.type]();
      presenter.init(this);
    } else {
      this._game.stop();
      this.doFinish(this._game.name, this._game.answered ? this._game.results : null);
    }
  }

  doFinish(name, stats) {
    DataHandler.loadStatsData(name, (previousStatistics) => {
      this.stats.init(this, previousStatistics);
      if (stats) {
        DataHandler.saveStatsData(name, stats);
      }
    });
  }

  setScreen(view, hasHeader) {
    const isHeaderShown = this.header.element.parentNode === this._mainElement;
    if (hasHeader && !isHeaderShown) {
      this.header.init(this);
      this._mainElement.insertBefore(this.header.element, this._mainElement.firstChild);
    } else if (hasHeader) {
      this.header.init(this);
    } else if (isHeaderShown) {
      this._mainElement.removeChild(this.header.element);
    }

    const currentView = this._view;
    if (currentView) {
      if (view === this._greeting && currentView === this._intro) {
        this.swapViewElements(currentView.element, view.element);
      } else {
        this._mainElement.removeChild(currentView.element);
      }
    }
    this._view = view;
    this._mainElement.insertBefore(view.element, this._footer.element);
  }

  swapViewElements(currentElement, swappingElement) {
    const containerElement = this.prepareSwap(currentElement, swappingElement);
    crossFade(currentElement, swappingElement, () => {
      this.cleanupSwap(containerElement, currentElement, swappingElement);
    });
  }

  prepareSwap(currentElement, swappingElement) {
    const mainElement = this._mainElement;
    const containerElement = document.createElement(`div`);

    mainElement.insertBefore(containerElement, currentElement);
    containerElement.appendChild(currentElement);

    containerElement.style.overflow = `hidden`;
    containerElement.style.position = `relative`;
    containerElement.style.height = `${currentElement.clientHeight}px`;

    containerElement.append(swappingElement);

    swappingElement.style.position = `absolute`;
    swappingElement.style.top = `0px`;
    swappingElement.style.opacity = 0;

    return containerElement;
  }

  cleanupSwap(containerElement, currentElement, swappingElement) {
    const mainElement = this._mainElement;
    containerElement.removeChild(currentElement);
    currentElement.style.opacity = null;

    swappingElement.style.position = null;
    swappingElement.style.top = null;

    containerElement.style.overflow = null;
    containerElement.style.position = null;
    containerElement.style.height = null;

    mainElement.insertBefore(swappingElement, this._footer.element);
    mainElement.removeChild(containerElement);
  }

  addNotification(view) {
    this._mainElement.insertBefore(view, this._mainElement.firstChild);
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
