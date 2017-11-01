import ViewAbstract from './view-abstract.js';

const CLASS_RESULT_NUMBER = `result__number`;
const CLASS_RESULT_BAR = `result__bar`;

export default class ViewStatsTable extends ViewAbstract {

  constructor(statistics) {
    super();
    this._statistics = statistics;
    this._index = 0;
  }

  get template() {
    return `${this._statistics.lives > 0 ? this.winTemplate : this.lossTemplate}`;
  }

  get templateTag() {
    return `table`;
  }

  get templateClass() {
    return `result__table`;
  }

  get templateId() {
    return ``;
  }

  get winTemplate() {
    return `
      <tr>
        <td class="${CLASS_RESULT_NUMBER}">${this._index}.</td>
        <td class="${CLASS_RESULT_BAR}" colspan="2"></td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">${this._statistics.correctsPoints}</td>
      </tr>
      <tr>
        ${this._statistics.fastsAmount ? `
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${this._statistics.fastsAmount}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${this._statistics.fastsPoints}</td>` : ``}
      </tr>
      <tr>
        ${this._statistics.lives ? `
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${this._statistics.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${this._statistics.livesPoints}</td>` : ``}
      </tr>
      <tr>
        ${this._statistics.slowsAmount ? `
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${this._statistics.slowsAmount}&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${this._statistics.slowsPoints}</td>` : ``}
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${this._statistics.totalPoints}</td>
      </tr>`;
  }

  get lossTemplate() {
    return `
       <tr>
        <td class="${CLASS_RESULT_NUMBER}">${this._index}.</td>
        <td class="${CLASS_RESULT_BAR}" colspan="2"></td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>`;
  }

  set index(index) {
    this.element.querySelector(`.${CLASS_RESULT_NUMBER}`).innerHTML = index;
  }

  update(statistics) {
    this._statistics = statistics;
    this._element = null;
  }


  addInnerViews() {
    this.element.querySelector(`.${CLASS_RESULT_BAR}`).appendChild(this._statistics.statsBar.element);
  }

}
