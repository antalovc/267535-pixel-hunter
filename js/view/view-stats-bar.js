import ViewAbstract from './view-abstract.js';

export default class ViewStatsBar extends ViewAbstract {

  constructor(statistics) {
    super();
    this._statistics = statistics;
  }

  get template() {
    return `${this.items}`;
  }

  get templateTag() {
    return `ul`;
  }

  get templateClass() {
    return `stats`;
  }

  get templateId() {
    return ``;
  }

  get items() {
    let items = this._statistics.answers.reduce((result, description) => {
      return result + `<li class="stats__result stats__result--${description}"></li>\n`;
    }, ``);
    for (let i = this._statistics.answers.length; i < this._statistics.questionsTotal; i++) {
      items += `<li class="stats__result stats__result--unknown"></li>\n`;
    }
    return items;
  }

  update(statistics) {
    this._statistics = statistics;
    this.element.innerHTML = `${this.items}`;
  }

}
