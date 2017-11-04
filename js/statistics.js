import Answer from './answer.js';
import Game from './game.js';
import StatsBar from './presenter/presenter-stats-bar.js';
import StatsTable from './presenter/presenter-stats-table.js';

const StatisticsConfig = {
  POINTS_ANSWER_VALID: 100,
  POINTS_ANSWER_FAST: 50,
  POINTS_ANSWER_SLOW: -50,
  POINTS_LIVE_SPARE: 50
};

class Statistics {

  constructor(config) {
    this._stats = null;
    this._statsBar = null;
    this._statsTable = null;

    const isConfigured = typeof config !== `undefined`;
    this._lives = isConfigured ? config.lives : Game.livesTotal;
    this._answers = isConfigured ? config.answers : [];
    if (isConfigured) {
      this.calculateResulting();
    }
  }

  get lives() {
    return this._lives >= 0 ? this._lives : 0;
  }

  set lives(lives) {
    this._lives = lives;
  }

  get answers() {
    return this._answers;
  }

  set answers(answers) {
    this._answers = answers;
  }

  get totalPoints() {
    return this.correctsPoints + this.fastsPoints + this.slowsPoints + this.livesPoints;
  }

  get correctsAmount() {
    return this._stats.correctsAmount;
  }

  get statsBar() {
    this._statsBar = this._statsBar ? this._statsBar : new StatsBar(this);
    return this._statsBar;
  }

  get statsTable() {
    this._statsTable = this._statsTable ? this._statsTable : new StatsTable(this);
    return this._statsTable;
  }

  get correctsPoints() {
    return this.correctsAmount * StatisticsConfig.POINTS_ANSWER_VALID;
  }

  get fastsAmount() {
    return this._stats.fastsAmount;
  }

  get fastsPoints() {
    return this.fastsAmount * StatisticsConfig.POINTS_ANSWER_FAST;
  }

  get slowsAmount() {
    return this._stats.slowsAmount;
  }

  get slowsPoints() {
    return this.slowsAmount * StatisticsConfig.POINTS_ANSWER_SLOW;
  }

  get livesPoints() {
    return this.lives * StatisticsConfig.POINTS_LIVE_SPARE;
  }

  answer(isCorrect, time) {
    this._answers.push(Answer.generateDescription(isCorrect, time));
  }

  burnLife() {
    this._lives--;
  }

  update(calculateResulting) {
    this.statsBar.init(this);
    if (calculateResulting) {
      this.calculateResulting();
      this.statsTable.init(this);
    }
  }

  reset() {
    this._lives = Game.livesTotal;
    this._answers = [];
  }

  resetStats() {
    this._stats = {
      correctsAmount: 0,
      fastsAmount: 0,
      slowsAmount: 0,
      answers: [],
      questionsTotal: Game.questionsTotal
    };
  }

  calculateResulting() {
    this.resetStats();
    this._answers.forEach((answer) => {
      const stats = this._stats;
      switch (answer) {
        case Answer.AnswerType.FAST:
          stats.correctsAmount++;
          stats.fastsAmount++;
          break;
        case Answer.AnswerType.SLOW:
          stats.correctsAmount++;
          stats.slowsAmount++;
          break;
        case Answer.AnswerType.CORRECT:
          stats.correctsAmount++;
          break;
      }
    });
  }

  static get questionsTotal() {
    return Game.questionsTotal;
  }

}

export {Statistics, StatisticsConfig};
