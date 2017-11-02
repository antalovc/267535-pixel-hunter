import Answer from './answer.js';

const STATE_DELIMITER = `&`;
const STATE_EQUALER = `=`;
const RoutesParams = {
  NAME: `name`,
  LIVES: `lives`,
  STATS: `stats`
};

const CodeByAnswerType = {
  [Answer.AnswerType.WRONG]: 0,
  [Answer.AnswerType.SLOW]: 1,
  [Answer.AnswerType.CORRECT]: 2,
  [Answer.AnswerType.FAST]: 3
};

const AnswerTypeByCode = [
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
    return (typeof this._stateObj[RoutesParams.LIVES] !== `undefined`) ? +this._stateObj[RoutesParams.LIVES] : null;
  }

  get name() {
    return (typeof this._stateObj[RoutesParams.NAME] !== `undefined`) ? this._stateObj[RoutesParams.NAME] : null;
  }

  get stats() {
    return (typeof this._stateObj[RoutesParams.STATS] !== `undefined`) ? this._stateObj[RoutesParams.STATS] : null;
  }

  get state() {
    return {
      stats: StateAdapter.codeToAnswers(this.stats),
      lives: this.lives,
      name: this.name
    };
  }

  isGameState() {
    return this.lives !== null && this.name !== null && this.stats !== null;
  }

  isStatsState() {
    return this.name !== null;
  }

  getStateHash(state) {
    const nameHash = `${RoutesParams.NAME}${STATE_EQUALER}${state.name}`;
    const livesHash = `${RoutesParams.LIVES}${STATE_EQUALER}${state.lives}`;
    const statsHash = `${RoutesParams.STATS}${STATE_EQUALER}${StateAdapter.answersToCode(state.stats)}`;
    return `${nameHash}${STATE_DELIMITER}${livesHash}${STATE_DELIMITER}${statsHash}`;
  }

  static codeToAnswers(stats) {
    return stats ? stats.split(``).map((stat) => {
      return AnswerTypeByCode[stat];
    }) : [];
  }

  static answersToCode(answers) {
    return answers.map((answer) => {
      return CodeByAnswerType[answer];
    }).join(``);
  }
}

export default new StateAdapter();
