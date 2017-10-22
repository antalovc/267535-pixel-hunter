import getHeader from './element/header.js';
import getFooter from './element/footer.js';
import getIntro from './element/intro.js';
import getGreeting from './element/greeting.js';
import getRules from './element/rules.js';
import getGame1 from './element/game-1.js';
import getGame2 from './element/game-2.js';
import getGame3 from './element/game-3.js';
import getStats from './element/stats.js';
import QuestionBase from './question/question-base.js';

const HAS_HEADER = true;
const NO_HEADER = false;

export default class ScreenManager {

  constructor(main) {
    this._main = main;
    this._viewHeader = null;
    this._viewFooter = getFooter();
    this._viewContent = null;

    this._viewIntro = null;
    this._viewGreeting = null;
    this._viewRules = null;
    this._viewGame1 = null;
    this._viewGame2 = null;
    this._viewGame3 = null;
    this._viewStats = null;

    this._gameViews = {
      [QuestionBase.QUESTION_TYPE.TYPE_1]: () => {
        return this.viewGame1;
      },
      [QuestionBase.QUESTION_TYPE.TYPE_2]: () => {
        return this.viewGame2;
      },
      [QuestionBase.QUESTION_TYPE.TYPE_3]: () => {
        return this.viewGame3;
      }
    };

    this._mainElement = document.querySelector(`main.central`);
    this._mainElement.innerHTML = ``;
    this._mainElement.appendChild(this._viewFooter.element);
  }

  get viewIntro() {
    this._viewIntro = this._viewIntro ? this._viewIntro : getIntro(this._main);
    return this._viewIntro;
  }

  get viewGreeting() {
    this._viewGreeting = this._viewGreeting ? this._viewGreeting : getGreeting(this._main);
    return this._viewGreeting;
  }
  get viewRules() {
    this._viewRules = this._viewRules ? this._viewRules.update(this._main) : getRules(this._main);
    return this._viewRules;
  }

  get viewGame1() {
    this._viewGame1 = this._viewGame1 ? this._viewGame1.update(this._main) : getGame1(this._main);
    return this._viewGame1;
  }

  get viewGame2() {
    this._viewGame2 = this._viewGame2 ? this._viewGame2.update(this._main) : getGame2(this._main);
    return this._viewGame2;
  }

  get viewGame3() {
    this._viewGame3 = this._viewGame3 ? this._viewGame3.update(this._main) : getGame3(this._main);
    return this._viewGame3;
  }

  get viewStats() {
    this._viewStats = this._viewStats ? this._viewStats.update(this._main) : getStats(this._main);
    return this._viewStats;
  }

  setScreenIntro() {
    this.setScreen(this.viewIntro, NO_HEADER);
  }

  setScreenGreeting() {
    this.setScreen(this.viewGreeting, NO_HEADER);
  }

  setScreenRules() {
    this.setScreen(this.viewRules, HAS_HEADER);
  }

  setScreenGame() {
    const view = this._gameViews[this._main.game.currentQuestion.questionType]();
    this.setScreen(view, HAS_HEADER);
  }

  setScreenStats() {
    this.setScreen(this.viewStats, HAS_HEADER);
  }

  setScreen(view, hasHeader) {
    const isHeaderShown = this._viewHeader && this._viewHeader.element.parentNode === this._mainElement;
    if (hasHeader && !isHeaderShown) {
      this._viewHeader = getHeader(this._main);
      this._mainElement.insertBefore(this._viewHeader.element, this._mainElement.firstChild);
    } else if (hasHeader) {
      this._viewHeader.update(this._main);
    } else if (isHeaderShown) {
      this._mainElement.removeChild(this._viewHeader.element);
    }

    if (this._viewContent) {
      this._mainElement.removeChild(this._viewContent.element);
    }
    this._viewContent = view;
    this._mainElement.insertBefore(view.element, this._viewFooter.element);
  }

}
