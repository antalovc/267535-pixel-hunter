import {Statistics} from '../statistics.js';
import ViewAbstract from "./view-abstract.js";

export default class ViewGreeting extends ViewAbstract {

  constructor(main) {
    super();
    this._statistics = new Statistics(main.game);
  }

  get template() {
    return `
      <h1>${this._statistics.livesAmount ? `Победа!` : `Fail`}</h1>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
             ${this._statistics.statsTemplate}
          </td>
          <td class="result__points">×&nbsp;100</td>
          <td class="result__total">${this._statistics.correctsPoints}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${this._statistics.fastsAmount}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${this._statistics.fastsPoints}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${this._statistics.livesAmount}&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${this._statistics.livesPoints}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${this._statistics.slowsAmount}&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${this._statistics.slowsPoints}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${this._statistics.totalPoints}</td>
        </tr>
      </table>`;
  }

  get templateTag() {
    return `div`;
  }

  get templateClass() {
    return `result`;
  }

  get templateId() {
    return ``;
  }

  bind() {
  }

}
