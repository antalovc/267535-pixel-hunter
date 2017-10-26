import getStatsBar from './presenter/get-stats-bar.js';
import Answer from './answer.js';

const STATISTICS_CONFIG = {
  POINTS_ANSWER_VALID: 100,
  POINTS_ANSWER_FAST: 50,
  POINTS_ANSWER_SLOW: -50,
  POINTS_LIVE_SPARE: 50
};

class Statistics {

  constructor(game) {
    this._stats = null;
    this._game = game;

    this.calculateResulting();

    this._statsBar = null;
  }

  get questionsTotal() {
    return this._stats.questionsTotal;
  }

  get totalPoints() {
    return this.correctsPoints + this.fastsPoints + this.slowsPoints + this.livesPoints;
  }

  get correctsAmount() {
    return this._stats.correctsAmount;
  }

  get correctsPoints() {
    return this.correctsAmount * STATISTICS_CONFIG.POINTS_ANSWER_VALID;
  }

  get fastsAmount() {
    return this._stats.fastsAmount;
  }

  get fastsPoints() {
    return this.fastsAmount * STATISTICS_CONFIG.POINTS_ANSWER_FAST;
  }

  get slowsAmount() {
    return this._stats.slowsAmount;
  }

  get slowsPoints() {
    return this.slowsAmount * STATISTICS_CONFIG.POINTS_ANSWER_SLOW;
  }

  get livesAmount() {
    return this._stats.livesAmount;
  }

  get livesPoints() {
    return this.livesAmount * STATISTICS_CONFIG.POINTS_LIVE_SPARE;
  }

  get answers() {
    return this._stats.answers;
  }

  get statsBar() {
    this._statsBar = this._statsBar || getStatsBar(this);
    return this._statsBar;
  }

  update() {
    this.calculateResulting();
    this.statsBar.update(this);
  }

  resetStats() {
    this._stats = {
      correctsAmount: 0,
      fastsAmount: 0,
      slowsAmount: 0,
      livesAmount: this._game.lives,
      answers: this._game.answers,
      questionsTotal: this._game.questionsTotal
    };
  }

  calculateResulting() {
    this.resetStats();
    this._game.answers.forEach((answer) => {
      const stats = this._stats;
      switch (answer) {
        case Answer.ANSWER_DESCRIPTIONS.FAST:
          stats.correctsAmount++;
          stats.fastsAmount++;
          break;
        case Answer.ANSWER_DESCRIPTIONS.SLOW:
          stats.correctsAmount++;
          stats.slowsAmount++;
          break;
        case Answer.ANSWER_DESCRIPTIONS.CORRECT:
          stats.correctsAmount++;
          break;
      }
    });
  }
}

export {Statistics, STATISTICS_CONFIG};
