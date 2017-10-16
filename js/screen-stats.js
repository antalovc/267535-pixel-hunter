import {createElementFromTemplate} from './util.js';
import getHeader from './element-header';
import getFooter from './element-footer';
import {Statistics} from './statistics.js';

export default (main) => {

  let gameStats = new Statistics(main.game);

  const screenElement = createElementFromTemplate(`div`, `
    <h1>${gameStats.livesAmount ? `Победа!` : `Fail`}</h1>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
           ${gameStats.statsTemplate}
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">${gameStats.correctsPoints}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${gameStats.fastsAmount}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${gameStats.fastsPoints}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${gameStats.livesAmount}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${gameStats.livesPoints}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${gameStats.slowsAmount}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${gameStats.slowsPoints}</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${gameStats.totalPoints}</td>
      </tr>
    </table>`, `result`);

  const screenConfig = new Map();

  screenConfig.set(`header`, getHeader());
  screenConfig.set(`contents`, screenElement);
  screenConfig.set(`footer`, getFooter());

  return screenConfig;
};
