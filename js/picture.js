import resize from './resize.js';

export default class Picture {

  constructor(config) {
    this._path = config.path;
    this._isPhoto = config.isPhoto;
    this._scaleToWidth = config.width;
    this._scaleToHeight = config.height;
    this._width = config.width;
    this._height = config.height;
    this._image = null;
  }

  get path() {
    return this._path;
  }

  get isPhoto() {
    return this._isPhoto;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get image() {
    return this._image;
  }

  set image(image) {
    let {
      width,
      height
    } = resize({
      width: this._scaleToWidth,
      height: this._scaleToHeight
    }, {
      width: image.width,
      height: image.height
    });
    this._width = width;
    this._height = height;
    image.width = width;
    image.height = height;
    this._image = image;
  }
}
