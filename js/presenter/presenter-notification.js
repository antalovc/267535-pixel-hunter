import ViewNotification from '../view/view-notification.js';

export default class PresenterNotification {

  constructor(app) {
    this._app = app;
    this._notificationView = new ViewNotification();
    this._notificationView.onRestartClicked = () => {
      this.deinit();
      app.greet();
    };
    this._notificationView.onPlayClicked = () => {
      this.deinit();
    };
  }

  init() {
    this._app.addNotification(this.element);
  }

  deinit() {
    this._app.removeNotification(this.element);
  }

  get element() {
    return this._notificationView.element;
  }
}
