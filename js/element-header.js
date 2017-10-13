import {createElementFromTemplate, addSelfRemovingEventListener} from './util.js';
import main from './main.js';

export default (game) => {

  const drawLives = () => {
    const currentLives = game.lives;
    let res = ``;
    for (let i = 0; i < game.livesTotal; i++) {
      res += `<img src="img/heart__${i < currentLives ? `full` : `empty`}.svg" class="game__heart" alt="Life" width="32" height="32">`;
    }
    return res;
  };

  const footerElement = createElementFromTemplate(`header`, `
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    ${game && game.isRunning ? `
      <h1 class="game__timer">${game.currentQuestion.getTimeLeft()}</h1>
      <div class="game__lives">
        ${drawLives(game.currentQuestion)}
      </div>` : ``}`, `header`);

  addSelfRemovingEventListener(footerElement.querySelector(`.back`), `click`, () => {
    main.greet();
  });


  return footerElement;
};
