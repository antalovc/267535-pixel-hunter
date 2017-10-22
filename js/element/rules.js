import ViewRules from '../view/view-rules.js';

export default (main) => {
  const rules = new ViewRules(main);

  rules.onStartClicked = () => {
    main.startGame(rules.playerName);
  };

  return rules;
};
