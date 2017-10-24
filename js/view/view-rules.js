import ViewAbstract from './view-abstract.js';

export default class ViewRules extends ViewAbstract {

  constructor(main) {
    super();
    this._main = main;
  }

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
        <input class="rules__input" type="text" placeholder="Ваше Имя" required>
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
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

  get playerNameElement() {
    this._playerNameElement = this._playerNameElement || this.element.querySelector(`.rules__input`);
    return this._playerNameElement;
  }

  get playerName() {
    return this.playerNameElement.value;
  }

  bind() {
    const viewElement = this.element;
    const formInputElement = viewElement.querySelector(`.rules__input`);
    const formSubmitElement = viewElement.querySelector(`.rules__button`);

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
    this.playerNameElement.value = ``;
    return this;
  }

  onStartClicked() {
  }

}
