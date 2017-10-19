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

  render() {
    return createElementFromTemplate(this.templateTag, this.template, this.templateClass, this.templateId);
  }

  bind() {
  }

  unbind() {
  }

  update() {
    return this;
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }

}
