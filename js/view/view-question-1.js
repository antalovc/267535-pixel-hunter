import ViewQuestionAbstract from './view-question-abstract.js';

export default class ViewQuestion1 extends ViewQuestionAbstract {

  get template() {
    return `
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      ${this.picturesElements}
    </form>`;
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

  update(game) {
    this._currentQuestion = game.currentQuestion;
    Array.from(this.element.querySelectorAll(`.game__content img`)).forEach((img, index) => {
      img.setAttribute(`src`, this._currentQuestion.pictures[index].path);
    });
    Array.from(this.element.querySelectorAll(`input[type="radio"]`)).forEach((radio) => {
      radio.checked = false;
    });
    super.update(game);
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
