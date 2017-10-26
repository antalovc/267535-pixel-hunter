import Header from './presenter/presenter-header.js';
import Footer from './presenter/presenter-footer.js';
import Intro from './presenter/presenter-intro.js';
import Greeting from './presenter/presenter-greeting.js';
import Rules from './presenter/presenter-rules.js';
import Question1 from './presenter/presenter-question-1.js';
import Question2 from './presenter/presenter-question-2.js';
import Question3 from './presenter/presenter-question-3.js';
import Stats from './presenter/presenter-stats.js';
import QuestionBase from './question/question-base.js';
import Game from './game.js';
import createTimer from './create-timer.js';

const HAS_HEADER = true;
const NO_HEADER = false;

/* const ROUTES_KEYS = {
  INTRO: ``,
  GREET: `greet`,
  RULES: `rules`
};*/

class Application {

  constructor() {
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

    this._questionViews = {
      [QuestionBase.QUESTION_TYPE.TYPE_1]: () => {
        return this.question1;
      },
      [QuestionBase.QUESTION_TYPE.TYPE_2]: () => {
        return this.question2;
      },
      [QuestionBase.QUESTION_TYPE.TYPE_3]: () => {
        return this.question3;
      }
    };

    this._mainElement = document.querySelector(`main.central`);
    this._mainElement.innerHTML = ``;
    this._mainElement.appendChild(this._footer.element);

    this._game = null;
    this._timer = createTimer();

    this.showIntro();
    /* this.readyRoutes = {
      [ROUTES_KEYS.INTRO]: this.introduce,
      [ROUTES_KEYS.GREET]: this.greet,
      [ROUTES_KEYS.RULES]: this.prepare
    };
    window.onhashchange = this.onHashChanged;
    this.onHashChanged();*/
  }

  // game getters part ===========================================

  get game() {
    return this._game;
  }

  get isGameHasNextQuestion() {
    return (this._game && this._game.hasNextQuestion);
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

  // game part ===================================================

  introduce() {
    this.showIntro();
  }

  greet() {
    if (this._game) {
      this._game.stop();
      this._game = null;
    }
    this.showGreeting();
  }

  prepare() {
    this.showRules();
  }

  startGame(playerName) {
    this._game = new Game(this, playerName);
    this.showQuestion();
  }

  stepGame() {
    if (this.isGameHasNextQuestion) {
      this._game.step();
      this.showQuestion();
    } else {
      this._game.stop();
      this.showStats();
    }
  }

  // views part ==================================================

  showIntro() {
    this.intro.init(this);
  }

  showGreeting() {
    this.greeting.init(this);
  }

  showRules() {
    this.rules.init(this);
  }

  showQuestion() {
    const presenter = this._questionViews[this._game.currentQuestion.questionType]();
    presenter.init(this);
  }

  showStats() {
    this.stats.init(this);
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

  // init ========================================================

  /* init(hash) {
    const readyRoute = this.readyRoutes[hash];
    if (readyRoute) {
      readyRoute.apply(this);
    } else {
      this._game = new Game(this);
      this._game.state = hash;
      this.stepGame();
    }
  }

  onHashChanged() {
    this.init(location.hash.replace(`#`, ``));
  }*/

}

export default new Application();
