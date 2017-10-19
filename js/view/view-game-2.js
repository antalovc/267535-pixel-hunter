import ViewAbstract from "./view-abstract.js";

export default class ViewGame2 extends ViewAbstract {

  constructor(question) {
    super();
    this._currentQuestion = question;
  }

  get template() {
    return `
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option" width="705" height="455">
        <img src="${this._currentQuestion.pictures[0].path}" alt="Option 1">
        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
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
    Array.from(this.element.querySelectorAll(`input[type="radio"]`)).forEach((element) => {
      element.addEventListener(`change`, (evt) => {
        this.onSubAnswer(evt.target.value === `photo`);
      });
    });
  }

  update() {
    return this;
  }

  onSubAnswer() {
  }

}
