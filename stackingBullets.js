let mouseX, mouseY, frameRequest, octoTankReloadMs, isOctoTankStacking, isArtificialMouseMove;

const Angle_45_Degrees = Math.PI * 45 / 180;

const canvas = document.getElementById('canvas');
const target = document.getElementById('a');
const config = { attributes: true, attributeFilter: ['style'] };
const reloadStep = { octoTank: 20, predator: 120 };

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

const reloadSpeedMs = (tank) => (15 - tanksInfo[tank].bulletReload) * reloadStep[tank];

const predatorStacking = () => {
  const k = reloadSpeedMs('predator') / 9.6;

  const fire = (t, w) => {
    setTimeout(spaceDown, t);
    setTimeout(spaceUp, t + w);
  };

  fire(0, k);
  fire(k * 7.5, k * 2);
  fire(k * 15, 0);

  setTimeout(pressE, k * 15);
};

const artificialMouseMove = (x) => {
  const angle = Math.floor(x / octoTankReloadMs) % 2 ? Angle_45_Degrees : 0;

  const sin = Math.sin(angle);
  const cos = Math.cos(angle);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const diffX = mouseX - centerX;
  const diffY = mouseY - centerY;

  const clientX = cos * diffX - sin * diffY + centerX;
  const clientY = sin * diffX + cos * diffY + centerY;

  isArtificialMouseMove = true;
  canvas.dispatchEvent(new MouseEvent('mousemove', { clientX, clientY }));
  isArtificialMouseMove = false;

  frameRequest = window.requestAnimationFrame(artificialMouseMove);
};

const octoTankStacking = () => {
  pressE();

  isOctoTankStacking = !isOctoTankStacking;

  if (isOctoTankStacking) {
    octoTankReloadMs = reloadSpeedMs('octoTank');
    artificialMouseMove(0);
  } else {
    window.cancelAnimationFrame(frameRequest);
  }
};

const onMouseMove = (e) => {
  if (isOctoTankStacking) {
    if (!isArtificialMouseMove) {
      e.stopPropagation();

      mouseX = e.clientX;
      mouseY = e.clientY;
    }
  } else {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
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
  frameRequest = 0;
  octoTankReloadMs = 0;
  isOctoTankStacking = false;
  isArtificialMouseMove = false;

  document.addEventListener('keyup', onKeyUp);
  document.addEventListener('mousemove', onMouseMove, true);
};

const stop = () => {
  window.cancelAnimationFrame(frameRequest);
  document.removeEventListener('keyup', onKeyUp);
  document.removeEventListener('mousemove', onMouseMove, true);
};

const display = {
  none: start,
  block: stop,
};

new MutationObserver(() => display[target.style.display]()).observe(target, config);
