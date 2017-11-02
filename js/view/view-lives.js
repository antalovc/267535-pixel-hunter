import ViewAbstract from './view-abstract.js';
import Game from '../game.js';

export default class ViewLives extends ViewAbstract {

  constructor(game) {
    super();
    this._game = game;
  }

  get template() {
    return `${this.heartsElements}`;
  }

  get templateTag() {
    return `div`;
  }

  get templateClass() {
    return `game__lives`;
  }

  get templateId() {
    return ``;
  }

  update(game) {
    this._game = game;
    this._element.innerHTML = `${this.heartsElements}`;
  }

  get heartsElements() {
    const currentLives = this._game ? this._game.lives : 0;
    let res = ``;
    for (let i = 0; i < Game.livesTotal; i++) {
      res += `<img src="img/heart__${i < currentLives ? `full` : `empty`}.svg" class="game__heart" alt="Life" width="32" height="32">`;
    }
    return res;
  }

}
