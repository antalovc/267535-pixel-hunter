import ViewQuestionAbstract from './view-question-abstract.js';

export default class ViewQuestion3 extends ViewQuestionAbstract {

  get template() {
    return `
    ${this.taskElement}
    <form class="game__content  game__content--triple">
      ${this.picturesElements}
    </form>`;
  }

  get picturesElements() {
    return this._currentQuestion.pictures.reduce((result, picture, index) => {
      return result + `
      <div class="game__option" width="${picture.width}" height="${picture.height}">
        <img src="${picture.path}" alt="Option ${index + 1}">
      </div>\n`;
    }, ``);
  }

  bind() {
    Array.from(this.element.querySelectorAll(`.game__option`)).forEach((element) => {
      element.addEventListener(`click`, (evt) => {
        this.onSubAnswer(parseInt(evt.target.querySelector(`img`).alt.slice(-1), 10));
      });
    });
  }

  update(game) {
    this._currentQuestion = game.currentQuestion;
    Array.from(this.element.querySelectorAll(`.game__content img`)).forEach((img, index) => {
      img.setAttribute(`src`, this._currentQuestion.pictures[index].path);
    });
    super.update(game);
  }

  onSubAnswer() {
  }

}
