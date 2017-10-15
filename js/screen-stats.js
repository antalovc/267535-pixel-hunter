import {createElementFromTemplate} from './util.js';
import getHeader from './element-header';
import getFooter from './element-footer';

export default (main) => {

  const currentGame = main.game;
  const questions = currentGame.questions;

  let gameStats = questions.reduce((result, question) => {
    const answer = question.answer;
    let postFix = `wrong`;
    if (answer.isCorrect  ) {
      if (answer.isFast) {
        postFix = `fast`;
      } else if (answer.isSlow) {
        postFix = `slow`;
      } else {
        postFix = `correct`;
      }
    }
    return result + `<li class="stats__result stats__result--${postFix}"></li>\n`;
  }, ``);

  for (let i = questions.length; i < currentGame.questionsTotal; i++) {
    gameStats += `<li class="stats__result stats__result--unknown"></li>\n`;
  }

  const screenElement = createElementFromTemplate(`div`, `
    <h1>${currentGame.lives ? `Победа!` : `Fail`}</h1>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          <ul class="stats">
            ${gameStats}
          </ul>
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">900</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">1&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">50</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">2&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">-100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>`, `result`);

  const screenConfig = new Map();

  screenConfig.set(`header`, getHeader());
  screenConfig.set(`contents`, screenElement);
  screenConfig.set(`footer`, getFooter());

  return screenConfig;
};
