import ViewAbstract from "./view-abstract.js";

export default class ViewGame1 extends ViewAbstract {

  constructor(question) {
    super();
    this._currentQuestion = question;
  }

  get template() {
    return `
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      ${this.picturesElements}
    </form>
    <div class="stats">
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
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
    const viewElement = this.element;
    const answerRadioElements = Array.from(viewElement.querySelectorAll(`input[type="radio"]`));
    const answerCallback = (evt) => {
      this.onSubAnswer(parseInt(evt.target.name.slice(-1), 10), evt.target.value === `photo`);
    };
    answerRadioElements.forEach((element) => {
      element.addEventListener(`change`, answerCallback);
    });
  }

  update() {
    return this;
  }

  get picturesElements() {
    return this._currentQuestion.pictures.reduce((result, picture, index) => {
      return result + `
      <div class="game__option" width="468" height="458">
        <img src="${picture.path}" alt="Option ${index + 1}">
        <label class="game__answer game__answer--photo">
          <input name="question${index + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question${index + 1}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>\n`;
    }, ``);
  }

  onSubAnswer() {
  }

}
