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

const HAS_HEADER = true;
const NO_HEADER = false;

export default class Application {

  constructor(main) {
    this._main = main;
    this._header = null;
    this._footer = new Footer();
    this._viewContent = null;

    this._intro = null;
    this._greeting = null;
    this._rules = null;
    this._game1 = null;
    this._game2 = null;
    this._game3 = null;
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
  }

  get main() {
    return this._main;
  }

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
    this._game1 = this._game1 ? this._game1 : new Question1(this);
    return this._game1;
  }

  get question2() {
    this._game2 = this._game2 ? this._game2 : new Question2(this);
    return this._game2;
  }

  get question3() {
    this._game3 = this._game3 ? this._game3 : new Question3(this);
    return this._game3;
  }

  get stats() {
    this._stats = this._stats ? this._stats : new Stats(this);
    return this._stats;
  }

  showIntro() {
    this.intro.init();
  }

  showGreeting() {
    this.greeting.init();
  }

  showRules() {
    this.rules.init();
  }

  showQuestion() {
    const presenter = this._questionViews[this._main.game.currentQuestion.questionType]();
    presenter.init();
  }

  showStats() {
    this.stats.init();
  }

  setScreen(view, hasHeader) {
    const isHeaderShown = this._header && this._header.element.parentNode === this._mainElement;
    if (hasHeader && !isHeaderShown) {
      this._header = new Header(this);
      this._mainElement.insertBefore(this._header.element, this._mainElement.firstChild);
    } else if (hasHeader) {
      this._header.init(this._main);
    } else if (isHeaderShown) {
      this._mainElement.removeChild(this._header.element);
    }

    if (this._viewContent) {
      this._mainElement.removeChild(this._viewContent.element);
    }
    this._viewContent = view;
    this._mainElement.insertBefore(view.element, this._footer.element);
  }

}
