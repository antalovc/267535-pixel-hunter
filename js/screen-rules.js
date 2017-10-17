import {createElementFromTemplate, addSelfRemovingEventListener} from './util.js';
import getHeader from './element-header';
import getFooter from './element-footer';

export default (main) => {
  const screenElement = createElementFromTemplate(`div`, `
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
  </form>`, `rules`);

  const formInputElement = screenElement.querySelector(`.rules__input`);
  const formSubmitElement = screenElement.querySelector(`.rules__button`);

  const checkValidityCallback = () => {
    formSubmitElement.disabled = !formInputElement.checkValidity();
  };

  formInputElement.addEventListener(`input`, checkValidityCallback);
  addSelfRemovingEventListener(formSubmitElement, `click`, () => {
    formInputElement.removeEventListener(`input`, checkValidityCallback);
    main.startGame();
  }, true);

  const screenConfig = new Map();

  screenConfig.set(`header`, getHeader());
  screenConfig.set(`contents`, screenElement);
  screenConfig.set(`footer`, getFooter());

  return screenConfig;
};
