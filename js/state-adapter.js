import Answer from './answer.js';

const STATE_DELIMITER = `&`;
const STATE_EQUALER = `=`;
const ROUTES_PARAMS = {
  NAME: `name`,
  LIVES: `lives`,
  STATS: `stats`
};

const ANSWER_TO_CODE = {
  [Answer.AnswerType.WRONG]: 0,
  [Answer.AnswerType.SLOW]: 1,
  [Answer.AnswerType.CORRECT]: 2,
  [Answer.AnswerType.FAST]: 3
};

const CODE_TO_ANSWER = [
  Answer.AnswerType.WRONG,
  Answer.AnswerType.SLOW,
  Answer.AnswerType.CORRECT,
  Answer.AnswerType.FAST
];

class StateAdapter {

  constructor() {
    this._stateObj = null;
  }

  init(hash) {
    this._stateObj = hash.split(STATE_DELIMITER).reduce((result, parameter) => {
      const splitPosition = parameter.indexOf(STATE_EQUALER);
      result[parameter.slice(0, splitPosition)] = parameter.slice(splitPosition + 1);
      return result;
    }, {});
  }

  get lives() {
    return (typeof this._stateObj[ROUTES_PARAMS.LIVES] !== `undefined`) ? +this._stateObj[ROUTES_PARAMS.LIVES] : null;
  }

  get name() {
    return (typeof this._stateObj[ROUTES_PARAMS.NAME] !== `undefined`) ? this._stateObj[ROUTES_PARAMS.NAME] : null;
  }

  get stats() {
    return (typeof this._stateObj[ROUTES_PARAMS.STATS] !== `undefined`) ? this._stateObj[ROUTES_PARAMS.STATS] : null;
  }

  isGameState() {
    return this.lives !== null && this.name !== null && this.stats !== null;
  }

  isStatsState() {
    return this.name !== null;
  }

  getStateHash(state) {
    const nameHash = `${ROUTES_PARAMS.NAME}${STATE_EQUALER}${state.name}`;
    const livesHash = `${ROUTES_PARAMS.LIVES}${STATE_EQUALER}${state.lives}`;
    const statsHash = `${ROUTES_PARAMS.STATS}${STATE_EQUALER}${StateAdapter.answersToCode(state.stats)}`;
    return `${nameHash}${STATE_DELIMITER}${livesHash}${STATE_DELIMITER}${statsHash}`;
  }

  get state() {
    return {
      stats: StateAdapter.codeToAnswers(this.stats),
      lives: this.lives,
      name: this.name
    };
  }

  static codeToAnswers(stats) {
    return stats ? stats.split(``).map((stat) => {
      return CODE_TO_ANSWER[stat];
    }) : [];
  }

  static answersToCode(answers) {
    return answers.map((answer) => {
      return ANSWER_TO_CODE[answer];
    }).join(``);
  }
}

export default new StateAdapter();
