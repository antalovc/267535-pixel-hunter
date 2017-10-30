import {Statistics} from './statistics.js';
import Answer from './answer.js';

const NUMBER_GAME_LIVES = 3;
const NUMBER_GAME_QUESTION = 10;

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
    app.timer.callback = () => {
      this.currentQuestion.answer(false);
    };

    this._questions = questions;
    this._statistics = new Statistics();

    this._app = app;
    this._playerName = ``;
    this._finished = false;
  }

  get app() {
    return this._app;
  }

  static get livesTotal() {
    return NUMBER_GAME_LIVES;
  }

  static get questionsTotal() {
    return NUMBER_GAME_QUESTION;
  }

  get lives() {
    return this._statistics.lives;
  }

  get currentQuestion() {
    return this._questions[this._statistics.answers.length];
  }

  get statistics() {
    return this._statistics;
  }

  set playerName(playerName) {
    this._playerName = playerName;
  }

  get playerName() {
    return this._playerName;
  }

  get hasNextQuestion() {
    return this._statistics.answers.length < Game.questionsTotal && this._statistics.lives;
  }

  get isRunning() {
    return !this._finished && this._statistics.lives;
  }

  get finished() {
    return this._finished;
  }

  get state() {
    const nameHash = `${ROUTES_PARAMS.NAME}${STATE_EQUALER}${this._playerName}`;
    const livesHash = `${ROUTES_PARAMS.LIVES}${STATE_EQUALER}${this._statistics.lives}`;
    const statsHash = `${ROUTES_PARAMS.STATS}${STATE_EQUALER}${this.answersToCode(this._statistics.answers)}`;
    return `${nameHash}${STATE_DELIMITER}${livesHash}${STATE_DELIMITER}${statsHash}`;
  }

  get results() {
    return {
      stats: this._statistics.answers,
      lives: this._statistics.lives
    };
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
      this._statistics.answers = this.codeToAnswers(statesObject[ROUTES_PARAMS.STATS]);
      this._statistics._lives = +statesObject[ROUTES_PARAMS.LIVES];
      this._playerName = statesObject[ROUTES_PARAMS.NAME];
    }
  }

  codeToAnswers(stats) {
    return stats.split(``).map((stat) => {
      return CODE_TO_ANSWER[stat];
    });
  }

  answersToCode(answers) {
    return answers.map((answer) => {
      return ANSWER_TO_CODE[answer];
    }).join(``);
  }

  answer(isCorrect, time) {
    if (!isCorrect) {
      this._statistics.burnLife();
    }
    this._statistics.answer(isCorrect, time);
    this._app.stepGame();
  }

  step() {
    this._statistics.update();
  }

  stop() {
    this._finished = true;
    this._statistics.update(true);
  }

}
