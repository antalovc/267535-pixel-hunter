window.screenManager = (function () {

  const KEYCODE_ARROW_LEFT = 37;
  const KEYCODE_ARROW_RIGHT = 39;

  const screenIds = [`.central`, `#greeting`, `#rules`, `#game-1`, `#game-2`, `#game-3`, `#stats`];
  const screenElements = screenIds.map((screenId) => {
    const screenElement = document.querySelector(screenId);
    return screenElement.content ? screenElement.content : document.createRange().createContextualFragment(screenElement.innerHTML);
  });
  const mainElement = document.querySelector(`main.central`);

  let currentScreenIndex = 0;

  const setScreen = function (screenIndex) {
    screenIndex = Math.max(0, Math.min(screenIndex, screenElements.length - 1));

    if (screenIndex !== currentScreenIndex) {
      currentScreenIndex = screenIndex;
      mainElement.innerHTML = ``;
      mainElement.appendChild(screenElements[currentScreenIndex].cloneNode(true));
    }
  };

  const switchScreen = function (next) {
    if (typeof next === `undefined`) {
      next = true;
    }

    setScreen(next ? currentScreenIndex + 1 : currentScreenIndex - 1);
  };

  document.addEventListener(`keydown`, function (evt) {
    if (evt.altKey) {
      switch (evt.keyCode) {
        case KEYCODE_ARROW_LEFT:
          switchScreen(false);
          evt.preventDefault();
          break;
        case KEYCODE_ARROW_RIGHT:
          switchScreen();
          evt.preventDefault();
          break;
      }
    }
  });

  return {
    setScreen
  };

})();
