import {createElementFromTemplate} from './util.js';
import getHeader from './element-header';
import getFooter from './element-footer';

export default (main) => {

  const currentQuestion = main.game.currentQuestion;
  const picturesElements = currentQuestion.pictures.reduce((result, picture, index) => {
    return result + `
      <div class="game__option">
        <img src="${picture.path}" alt="Option ${index + 1}" width="468" height="458">
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
  const screenElement = createElementFromTemplate(`div`, `
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      ${picturesElements}
    </form>
    <div class="stats">
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
      </ul>
    </div>`, `game`);

  const answerRadioElements = Array.from(screenElement.querySelectorAll(`input[type="radio"]`));
  const answerCallback = (evt) => {
    const input = evt.target;
    currentQuestion.subanswer(parseInt(input.name.slice(-1), 10), input.value === `photo`, () => {
      answerRadioElements.forEach((element) => {
        element.removeEventListener(`change`, answerCallback);
      });
    });
  };
  answerRadioElements.forEach((element) => {
    element.addEventListener(`change`, answerCallback);
  });

  const screenConfig = new Map();

  screenConfig.set(`header`, getHeader(main.game));
  screenConfig.set(`contents`, screenElement);
  screenConfig.set(`footer`, getFooter());

  return screenConfig;
};
