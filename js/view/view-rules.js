import ViewAbstract from './view-abstract.js';

const CLASS_RULES_INPUT = `rules__input`;
const CLASS_RULES_BUTTON = `rules__button`;

export default class ViewRules extends ViewAbstract {

  get template() {
    return `
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
        src="img/photo_icon.png" width="16" height="16"> или рисунок <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На каждую попытку отводится 30 секунд.<br>
        Ошибиться можно не более 3 раз.<br>
        <br>
        Готовы?
      </p>
      <form class="rules__form">
        <input class="${CLASS_RULES_INPUT}" type="text" placeholder="Ваше Имя" required>
        <button class="${CLASS_RULES_BUTTON}  continue" type="submit" disabled>Go!</button>
      </form>`;
  }

  get templateTag() {
    return `div`;
  }

  get templateClass() {
    return `rules`;
  }

  get templateId() {
    return ``;
  }

  get nameElement() {
    this._nameElement = this._nameElement || this.element.querySelector(`.rules__input`);
    return this._nameElement;
  }

  get name() {
    return this.nameElement.value;
  }

  bind() {
    const viewElement = this.element;
    const formInputElement = viewElement.querySelector(`.${CLASS_RULES_INPUT}`);
    const formSubmitElement = viewElement.querySelector(`.${CLASS_RULES_BUTTON}`);

    const checkValidityCallback = () => {
      formSubmitElement.disabled = !formInputElement.checkValidity();
    };

    formInputElement.addEventListener(`input`, checkValidityCallback);
    formSubmitElement.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onStartClicked();
    });
  }

  update() {
    this.nameElement.value = ``;
  }

  onStartClicked() {
  }

}
