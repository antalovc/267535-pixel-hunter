import ViewFooter from '../view/view-footer.js';

class Footer {

  constructor(main) {
    this._footerView = new ViewFooter(main);
  }

  get element() {
    return this._footerView.element;
  }
}

export default Footer;
