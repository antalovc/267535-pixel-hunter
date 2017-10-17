import {createElementFromTemplate, addSelfRemovingEventListener} from './util.js';
import getFooter from './element-footer';

export default (main) => {
  const screenElement = createElementFromTemplate(`div`, `
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>`, `central__content`, `main`);

  addSelfRemovingEventListener(screenElement.querySelector(`.intro__asterisk`), `click`, () => {
    main.greet();
  });

  const screenConfig = new Map();

  screenConfig.set(`contents`, screenElement);
  screenConfig.set(`footer`, getFooter());

  return screenConfig;
};
