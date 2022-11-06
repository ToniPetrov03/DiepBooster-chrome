import { spaceDown, spaceUp, pressE } from '../service/keyEvents.js'

const predatorStacking = (reloadSpeed) => {
  const k = reloadSpeed / 9.6;

  const fire = (t, w) => {
    setTimeout(spaceDown, t);
    setTimeout(spaceUp, t + w);
  };

  fire(0, k);
  fire(k * 7.5, k * 2);
  fire(k * 15, 0);

  setTimeout(pressE, k * 15);
};

export default predatorStacking;
