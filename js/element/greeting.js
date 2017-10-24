import ViewGreeting from '../view/view-greeting.js';

export default (main) => {
  const greeting = new ViewGreeting(main);

  greeting.onContinueClicked = () => {
    main.prepare();
  };

  return greeting;
};
