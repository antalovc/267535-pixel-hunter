const mainElement = document.querySelector(`main.central`);

class ScreensManager {

  constructor() {
    // for possible optimisation with header/footer
    // this._currentConfig = null;
  }

  static setCurrentConfig(newConfig) {
    mainElement.innerHTML = ``;

    const newHeader = newConfig.get(`header`);
    if (newHeader) {
      mainElement.appendChild(newHeader);
    }

    mainElement.appendChild(newConfig.get(`contents`));

    const newFooter = newConfig.get(`footer`);
    if (newFooter) {
      mainElement.appendChild(newFooter);
    }
  }

}

export default ScreensManager;
