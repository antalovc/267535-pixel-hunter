export default class Picture {

  constructor(config) {
    this._path = config.path;
    this._isPhoto = config.isPhoto;
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
    this._image = image;
  }
}
