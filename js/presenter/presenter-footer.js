import ViewFooter from '../view/view-footer.js';

export default class PresenterFooter {

  constructor(app) {
    this._footerView = new ViewFooter(app);
  }

  get element() {
    return this._footerView.element;
  }
}
