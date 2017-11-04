import ViewQuestionAbstract from './view-question-abstract.js';

export default class ViewQuestion2 extends ViewQuestionAbstract {

  get template() {
    return `
    ${this.taskElement}
    <form class="${ViewQuestionAbstract.CLASS_GAME_CONTENT} ${ViewQuestionAbstract.CLASS_GAME_CONTENT}--wide">
      ${this.picturesElements}
    </form>`;
  }

  get picturesElements() {
    const picture = this._currentQuestion.pictures[0];
    return `
      <div class="${ViewQuestionAbstract.CLASS_GAME_OPTION}" width="${picture.width}" height="${picture.height}">
        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>`;
  }

  bind() {
    Array.from(this.element.querySelectorAll(`input[type="radio"]`)).forEach((element) => {
      element.addEventListener(`change`, (evt) => {
        this.onSubAnswer(evt.target.value === `photo`);
      });
    });
  }

  doUpdate(game) {
    this._currentQuestion = game.currentQuestion;
    this.replaceImageElement(this._currentQuestion.pictures[0]);
    Array.from(this.element.querySelectorAll(`input[type="radio"]`)).forEach((radio) => {
      radio.checked = false;
    });
    super.doUpdate(game);
  }

  addInnerViews() {
    const optionElement = this._element.querySelector(`.${ViewQuestionAbstract.CLASS_GAME_OPTION}`);
    optionElement.insertBefore(this.getImageElement(this._currentQuestion.pictures[0]), optionElement.firstChild);
  }

  needsBind() {
    return true;
  }

  hasInnerViews() {
    return true;
  }

  needsUpdate() {
    return true;
  }

}
