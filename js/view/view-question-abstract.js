import ViewAbstract from './view-abstract.js';

const CLASS_GAME_OPTION = `game__option`;
const CLASS_GAME_CONTENT = `game__content`;

export default class ViewQuestionAbstract extends ViewAbstract {

  constructor(game) {
    super();
    this._currentQuestion = game.currentQuestion;
    this._statistics = game.statistics;
    this._imageElements = {};
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

  get taskElement() {
    return `<p class="game__task">${this._currentQuestion.text}</p>`;
  }

  get picturesElements() {
    throw new Error(`Abstract method called`);
  }

  getImageElement(picture, index) {
    const count = (index || 0) + 1;
    picture.image.alt = `Option ${count}`;
    this._imageElements[count] = picture.image;
    return picture.image;
  }

  replaceImageElement(picture, index) {
    if (Object.keys(this._imageElements).length === 0) {
      return;
    }
    const count = (index || 0) + 1;
    const oldImageElement = this._imageElements[count];
    const newImageElement = this.getImageElement(picture, index);
    oldImageElement.parentNode.replaceChild(newImageElement, oldImageElement);
    this._imageElements[count] = newImageElement;
  }

  update(game) {
    this._statistics = game.statistics;
    if (this._statistics.statsBar.element.parentNode !== this.element) {
      this._element.appendChild(this._statistics.statsBar.element);
    }
  }

  addInnerViews() {
    this._element.appendChild(this._statistics.statsBar.element);
  }

  onSubAnswer() {
    throw new Error(`Abstract method called`);
  }

  static get CLASS_GAME_OPTION() {
    return CLASS_GAME_OPTION;
  }

  static get CLASS_GAME_CONTENT() {
    return CLASS_GAME_CONTENT;
  }

}
