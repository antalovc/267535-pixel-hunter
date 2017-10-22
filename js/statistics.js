import getStatsBar from "./element/stats-bar.js";

const STATISTICS_CONFIG = {
  POINTS_ANSWER_VALID: 100,
  POINTS_ANSWER_FAST: 50,
  POINTS_ANSWER_SLOW: -50,
  POINTS_LIVE_SPARE: 50
};

const answerFastDescription = `fast`;
const answerSlowDescription = `slow`;
const answerCorrectDescription = `correct`;
const answerWrongDescription = `wrong`;
const answerUnknownDescription = `unknown`;

class Statistics {

  constructor(game) {
    this._game = game;
    this._questions = game.questions;

    this.calculateResulting();

    this._statsBar = null;
  }

  get questions() {
    return this._questions;
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

  get answerDescriptions() {
    return this._stats.answerDescriptions;
  }

  get statsBar() {
    this._statsBar = this._statsBar || getStatsBar(this);
    return this._statsBar;
  }

  update() {
    this.calculateResulting();
    this.statsBar.update(this._game);
  }

  resetStats() {
    this._stats = {
      correctsAmount: 0,
      fastsAmount: 0,
      slowsAmount: 0,
      livesAmount: this._game.lives,
      answerDescriptions: [],
      questionsTotal: this._game.questionsTotal
    };
  }

  calculateResulting() {
    this.resetStats();
    this._questions.forEach((question) => {
      const stats = this._stats;
      let answerDescriptions = stats.answerDescriptions;
      const answer = question.answer;
      if (!answer) {
        answerDescriptions.push(answerUnknownDescription);
      } else if (answer.isCorrect) {
        stats.correctsAmount++;
        if (answer.isFast) {
          answerDescriptions.push(answerFastDescription);
          stats.fastsAmount++;
        } else if (answer.isSlow) {
          answerDescriptions.push(answerSlowDescription);
          stats.slowsAmount++;
        } else {
          answerDescriptions.push(answerCorrectDescription);
        }
      } else {
        answerDescriptions.push(answerWrongDescription);
      }
    });
  }
}

export {Statistics, STATISTICS_CONFIG};
