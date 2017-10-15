import {createElementFromTemplate} from './util.js';
import getHeader from './element-header';
import getFooter from './element-footer';

export default (main) => {

  const currentQuestion = main.game.currentQuestion;
  const picturesElements = currentQuestion.pictures.reduce((result, picture, index) => {
    return result + `
      <div class="game__option">
        <img src="${picture.path}" alt="Option ${index + 1}" width="304" height="455">
      </div>\n`;
  }, ``);

  const screenElement = createElementFromTemplate(`div`, `
    <p class="game__task">${currentQuestion.isIntrusPhoto ? `Найдите фото среди изображений` : `Найдите рисунок среди изображений`}</p>
    <form class="game__content  game__content--triple">
      ${picturesElements}
    </form>
    <div class="stats">
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--unknown"></li>
      </ul>
    </div>`, `game`);

  const answerOptionElements = Array.from(screenElement.querySelectorAll(`.game__option`));
  const answerCallback = (evt) => {
    answerOptionElements.forEach((optionElement) => {
      optionElement.removeEventListener(`click`, answerCallback);
    });
    currentQuestion.subanswer(parseInt(evt.target.querySelector(`img`).alt.slice(-1), 10));
  };
  answerOptionElements.forEach((element) => {
    element.addEventListener(`click`, answerCallback);
  });

  const screenConfig = new Map();

  screenConfig.set(`header`, getHeader(main.game));
  screenConfig.set(`contents`, screenElement);
  screenConfig.set(`footer`, getFooter());

  return screenConfig;
};
