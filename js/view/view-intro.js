import ViewAbstract from './view-abstract.js';

export default class ViewIntro extends ViewAbstract {

  get template() {
    return `
    <div id="intro" class="intro">
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>`;
  }

  get templateTag() {
    return `div`;
  }

  get templateClass() {
    return `central__content`;
  }

  get templateId() {
    return `main`;
  }

  onIntroClicked() {
  }

}
