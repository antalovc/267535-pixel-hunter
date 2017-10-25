import ViewQuestionAbstract from './view-question-abstract.js';

export default class ViewQuestion2 extends ViewQuestionAbstract {

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

  update(game) {
    this._currentQuestion = game.currentQuestion;
    this.element.querySelector(`img`).setAttribute(`src`, this._currentQuestion.pictures[0].path);
    Array.from(this.element.querySelectorAll(`input[type="radio"]`)).forEach((radio) => {
      radio.checked = false;
    });
    super.update(game);
  }

  onSubAnswer() {
  }

}
