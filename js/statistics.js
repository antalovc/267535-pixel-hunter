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

class Statistics {

  constructor(game) {
    this._game = game;
    this._questions = game.questions;

    this._stats = {
      correctsAmount: 0,
      fastsAmount: 0,
      slowsAmount: 0,
      livesAmount: game.lives,
      answerDescriptions: []
    };

    this._questions.forEach((question) => {
      const stats = this._stats;
      let answerDescriptions = stats.answerDescriptions;
      const answer = question.answer;
      if (answer.isCorrect) {
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

  get statsTemplate() {
    let gameStats = this.answerDescriptions.reduce((result, description) => {
      return result + `<li class="stats__result stats__result--${description}"></li>\n`;
    }, ``);

    for (let i = this._questions.length; i < this._game.questionsTotal; i++) {
      gameStats += `<li class="stats__result stats__result--unknown"></li>\n`;
    }
    return `
      <ul class="stats">
        ${gameStats}
      </ul>`;
  }
}

export {Statistics, STATISTICS_CONFIG};
