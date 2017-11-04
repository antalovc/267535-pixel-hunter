const DEFAULT_FADE_STEPS_NUMBER = 10;
const DEFAULT_FADE_TIME = 1; // sec
const SEC_TO_MSEC = 1000;

const createElementFromTemplate = (tagName, template, className, id) => {
  const containerElement = document.createElement(tagName);
  if (className) {
    containerElement.className = className;
  }
  if (id) {
    containerElement.id = id;
  }
  containerElement.innerHTML = template;
  return containerElement;
};

const crossFade = (elementOut, elementIn, callback) => {
  const timeStep = DEFAULT_FADE_TIME / DEFAULT_FADE_STEPS_NUMBER;
  let timeElapsed = 0;
  const opacityStep = 1 / DEFAULT_FADE_STEPS_NUMBER;
  let currentOpacity = 0;

  const fade = () => {
    if (timeElapsed < DEFAULT_FADE_TIME) {
      currentOpacity += opacityStep;
      elementIn.style.opacity = currentOpacity < 1 ? currentOpacity : 1;
      elementOut.style.opacity = 1 - currentOpacity > 0 ? 1 - currentOpacity : 0;
      timeElapsed += timeStep;
      setTimeout(fade, timeStep * SEC_TO_MSEC);
    } else {
      elementIn.style.opacity = 1;
      elementOut.style.opacity = 0;
      callback();
    }
  };

  elementIn.style.opacity = 0;
  elementOut.style.opacity = 1;
  fade();
};

export {createElementFromTemplate, crossFade};
