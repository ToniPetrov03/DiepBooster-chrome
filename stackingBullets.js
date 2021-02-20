let mouseX, mouseY, interval, isOctoTankStacking, isArtificialMouseMove;

const SIN_45_DEGREES = Math.sqrt(2) / 2;

const canvas = document.getElementById('canvas');
const target = document.getElementById('a');
const config = { attributes: true, attributeFilter: ['style'] };

const initKeyEvent = (keyCode, ...events) => {
  const eventInitDict = {
    which: keyCode,
    keyCode: keyCode,
    key: String.fromCharCode(keyCode),
  };

  return () => events.forEach((event) => window.dispatchEvent(new KeyboardEvent(event, eventInitDict)));
};

const pressE = initKeyEvent(69, 'keydown', 'keyup');
const spaceDown = initKeyEvent(32, 'keydown');
const spaceUp = initKeyEvent(32, 'keyup');

const predatorStacking = () => {
  const fire = (t, w) => {
    setTimeout(spaceDown, t * 1000);
    setTimeout(spaceUp, t * 1000 + w);
  };

  fire(0, 100);
  fire(0.75, 200);
  fire(1.5, 750);

  setTimeout(pressE, 2000);
};

const octoTankStacking = () => {
  pressE();

  isOctoTankStacking = !isOctoTankStacking;

  if (!isOctoTankStacking) return clearInterval(interval);

  interval = setInterval(() => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const diffX = mouseX - centerX;
    const diffY = mouseY - centerY;

    const clientX = SIN_45_DEGREES * (diffX - diffY) + centerX;
    const clientY = SIN_45_DEGREES * (diffX + diffY) + centerY;

    isArtificialMouseMove = true;
    canvas.dispatchEvent(new MouseEvent('mousemove', { clientX, clientY }));
    isArtificialMouseMove = false;
  }, 300 - 20 * tanksInfo.octoTank.bulletReload);
};

const onMouseMove = (e) => {
  // TODO Improve mouse control
  if (isOctoTankStacking && !isArtificialMouseMove) return e.stopPropagation();

  mouseX = e.clientX;
  mouseY = e.clientY;
};

const onKeyUp = (e) => {
  switch (e.code) {
    case tanksInfo.predator.keyCode: predatorStacking(); break;
    case tanksInfo.octoTank.keyCode: octoTankStacking(); break;
  }
};

const start = () => {
  mouseX = 0;
  mouseY = 0;
  interval = 0;
  isOctoTankStacking = false;
  isArtificialMouseMove = false;

  document.addEventListener('keyup', onKeyUp);
  document.addEventListener('mousemove', onMouseMove, true);
};

const stop = () => {
  clearInterval(interval);

  document.removeEventListener('keyup', onKeyUp);
  document.removeEventListener('mousemove', onMouseMove, true);
};

const display = {
  none: start,
  block: stop,
};

new MutationObserver(() => display[target.style.display]()).observe(target, config);
