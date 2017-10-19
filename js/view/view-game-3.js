import ViewAbstract from "./view-abstract.js";

export default class ViewGame3 extends ViewAbstract {

  constructor(question) {
    super();
    this._currentQuestion = question;
  }

  get template() {
    return `
    <p class="game__task">${this._currentQuestion.isIntrusPhoto ? `Найдите фото среди изображений` : `Найдите рисунок среди изображений`}</p>
    <form class="game__content  game__content--triple">
      ${this.picturesElements}
    </form>
    <div class="stats">
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--unknown"></li>
      </ul>
    </div>`;
  }

  get templateTag() {
    return `div`;
  }

  get templateClass() {
    return `game`;
  }

  get templateId() {
    return ``;
  }

  bind() {
    Array.from(this.element.querySelectorAll(`.game__option`)).forEach((element) => {
      element.addEventListener(`click`, (evt) => {
        this.onSubAnswer(parseInt(evt.target.querySelector(`img`).alt.slice(-1), 10));
      });
    });
  }

  update() {
    return this;
  }

  get picturesElements() {
    return this._currentQuestion.pictures.reduce((result, picture, index) => {
      return result + `
      <div class="game__option" width="304" height="455">
        <img src="${picture.path}" alt="Option ${index + 1}">
      </div>\n`;
    }, ``);
  }

  onSubAnswer() {
  }

}
