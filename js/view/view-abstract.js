import {createElementFromTemplate} from '../util.js';

export default class ViewAbstract {

  get template() {
    throw new Error(`Abstract method called`);
  }

  get templateTag() {
    throw new Error(`Abstract method called`);
  }

  get templateClass() {
    throw new Error(`Abstract method called`);
  }

  get templateId() {
    throw new Error(`Abstract method called`);
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      if (this.needsBind()) {
        this.bind();
      }
      if (this.hasInnerViews()) {
        this.addInnerViews();
      }
    }
    return this._element;
  }

  update(...args) {
    if (this.needsUpdate()) {
      this.doUpdate(...args);
    }
  }

  render() {
    return createElementFromTemplate(this.templateTag, this.template, this.templateClass, this.templateId);
  }

  needsBind() {
    throw new Error(`Abstract method called`);
  }

  bind() {
    throw new Error(`Abstract method called`);
  }

  hasInnerViews() {
    throw new Error(`Abstract method called`);
  }

  addInnerViews() {
    throw new Error(`Abstract method called`);
  }

  needsUpdate() {
    throw new Error(`Abstract method called`);
  }

  doUpdate() {
    throw new Error(`Abstract method called`);
  }

}
