import {Statistics} from './statistics.js';
import Answer from './answer.js';

const NUMBER_GAME_LIVES = 3;

const STATE_DELIMITER = `&`;
const STATE_EQUALER = `=`;
const ROUTES_PARAMS = {
  NAME: `name`,
  LIVES: `lives`,
  STATS: `stats`
};
const ANSWER_TO_CODE = {
  [Answer.ANSWER_DESCRIPTIONS.WRONG]: 0,
  [Answer.ANSWER_DESCRIPTIONS.SLOW]: 1,
  [Answer.ANSWER_DESCRIPTIONS.CORRECT]: 2,
  [Answer.ANSWER_DESCRIPTIONS.FAST]: 3
};
const CODE_TO_ANSWER = [
  Answer.ANSWER_DESCRIPTIONS.WRONG,
  Answer.ANSWER_DESCRIPTIONS.SLOW,
  Answer.ANSWER_DESCRIPTIONS.CORRECT,
  Answer.ANSWER_DESCRIPTIONS.FAST
];

export default class Game {

  constructor(app, questions) {
    this._lives = NUMBER_GAME_LIVES;
    this._livesTotal = NUMBER_GAME_LIVES;

    app.timer.callback = () => {
      this.currentQuestion.answer(false);
    };

    this._questions = questions;
    this._answers = [];
    this._statistics = null;

    this._app = app;
    this._playerName = ``;
    this._finished = false;
  }

  get app() {
    return this._app;
  }

  get livesTotal() {
    return this._livesTotal;
  }

  get questionsTotal() {
    return this._questions.length;
  }

  get lives() {
    return this._lives >= 0 ? this._lives : 0;
  }

  get answers() {
    return this._answers;
  }

  get currentQuestion() {
    return this._questions[this._answers.length];
  }

  get statistics() {
    this._statistics = this._statistics || new Statistics(this);
    return this._statistics;
  }

  set playerName(playerName) {
    this._playerName = playerName;
  }

  get playerName() {
    return this._playerName;
  }

  get hasNextQuestion() {
    return this._answers.length < this.questionsTotal && this.lives;
  }

  get isRunning() {
    return !this._finished && this.lives;
  }

  get state() {
    const nameHash = `${ROUTES_PARAMS.NAME}${STATE_EQUALER}${this._playerName}`;
    const livesHash = `${ROUTES_PARAMS.LIVES}${STATE_EQUALER}${this._lives}`;
    const statsHash = `${ROUTES_PARAMS.STATS}${STATE_EQUALER}${this.questionsState}`;
    return `${nameHash}${STATE_DELIMITER}${livesHash}${STATE_DELIMITER}${statsHash}`;
  }

  get questionsState() {
    return this._answers.map((answer) => {
      return ANSWER_TO_CODE[answer];
    }).join(``);
  }

  static checkState(state) {
    const statesObject = state.split(STATE_DELIMITER).reduce((result, parameter) => {
      const splitPosition = parameter.indexOf(STATE_EQUALER);
      result[parameter.slice(0, splitPosition)] = parameter.slice(splitPosition + 1);
      return result;
    }, {});

    return Object.values(ROUTES_PARAMS).every((value) => {
      return statesObject.hasOwnProperty(value);
    }) ? statesObject : false;
  }

  set state(state) {
    const statesObject = Game.checkState(state);

    if (statesObject) {
      this._answers = this.generateAnswers(statesObject[ROUTES_PARAMS.STATS]);
      this._lives = +statesObject[ROUTES_PARAMS.LIVES];
      this._playerName = statesObject[ROUTES_PARAMS.NAME];
    }
    this._statistics = null;
  }

  generateAnswers(stats) {
    return stats.split(``).map((stat) => {
      return CODE_TO_ANSWER[stat];
    });
  }

  answer(isCorrect, time) {
    if (!isCorrect) {
      this._lives--;
    }
    this._answers.push(Answer.generateDescription(isCorrect, time));
    this._app.stepGame();
  }

  step() {
    this.statistics.update(this);
  }

  stop() {
    this._finished = true;
    this.statistics.update(this);
  }

}
