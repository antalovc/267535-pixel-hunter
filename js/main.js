(function () {

  const KEYCODE_ARROW_LEFT = 37;
  const KEYCODE_ARROW_RIGHT = 39;

  const screenIds = [`.central`, `#greeting`, `#rules`, `#game-1`, `#game-2`, `#game-3`, `#stats`];
  const screenElements = screenIds.map((screenId) => {
    const screenElement = document.querySelector(screenId);
    return screenElement.content ? screenElement.content : document.createRange().createContextualFragment(screenElement.innerHTML);
  });
  const mainElement = document.querySelector(`main.central`);

  let currentScreenElementIndex = 0;

  const switchScreen = function (next) {
    if (typeof next === `undefined`) {
      next = true;
    }

    if (next) {
      currentScreenElementIndex = Math.max(0, Math.min(++currentScreenElementIndex, screenElements.length - 1));
    } else {
      currentScreenElementIndex = Math.max(0, Math.min(--currentScreenElementIndex, screenElements.length - 1));
    }

    mainElement.innerHTML = ``;
    mainElement.appendChild(screenElements[currentScreenElementIndex].cloneNode(true));
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

})();
