import ViewFooter from '../view/view-footer.js';

export default class PresenterFooter {

  constructor(main) {
    this._footerView = new ViewFooter(main);
  }

  get element() {
    return this._footerView.element;
  }
}
