import ViewGameAbstract from "./view-game-abstract.js";

export default class ViewGame2 extends ViewGameAbstract {

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
    </form>`;
  }

  bind() {
    Array.from(this.element.querySelectorAll(`input[type="radio"]`)).forEach((element) => {
      element.addEventListener(`change`, (evt) => {
        this.onSubAnswer(evt.target.value === `photo`);
      });
    });
  }

  update(main) {
    this._currentQuestion = main.game.currentQuestion;
    this._element.querySelector(`img`).setAttribute(`src`, this._currentQuestion.pictures[0].path);
    Array.from(this._element.querySelectorAll(`input[type="radio"]`)).forEach((radio) => {
      radio.checked = false;
    });
    super.update(main);
    return this;
  }

  onSubAnswer() {
  }

}
