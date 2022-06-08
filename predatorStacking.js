const predatorStacking = (reloadSpeedMs) => {
  const k = reloadSpeedMs / 9.6;

  const fire = (t, w) => {
    setTimeout(spaceDown, t);
    setTimeout(spaceUp, t + w);
  };

  fire(0, k);
  fire(k * 7.5, k * 2);
  fire(k * 15, 0);

  setTimeout(pressE, k * 15);
};
