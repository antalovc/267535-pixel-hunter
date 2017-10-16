import {createElementFromTemplate} from './util.js';
import getHeader from './element-header';
import getFooter from './element-footer';

export default (main) => {

  const currentQuestion = main.game.currentQuestion;
  const screenElement = createElementFromTemplate(`div`, `
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${currentQuestion.pictures[0].path}" alt="Option 1" width="100%" height="100%">
        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
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

  const answerRadioElements = Array.from(screenElement.querySelectorAll(`input[type="radio"]`));
  const answerCallback = (evt) => {
    const input = evt.target;
    currentQuestion.subanswer(input.value === `photo`, () => {
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
