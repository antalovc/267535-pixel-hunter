export default class Picture {

  constructor(path, isPhoto) {
    this._path = path;
    this._isPhoto = isPhoto;
  }

  get path() {
    return this._path;
  }

  get isPhoto() {
    return this._isPhoto;
  }

}
