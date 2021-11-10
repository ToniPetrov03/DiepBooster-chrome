let mouseX, mouseY, frameRequest, isOctoTankStacking, isArtificialMouseMove;

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

const artificialMouseMove = (x = 0) => {
  const state = Math.floor(x * 0.00625) % 2;
  const angle = Math.PI * 45 / 180 * state;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const sin = Math.sin(angle);
  const cos = Math.cos(angle);

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

  isOctoTankStacking ?
    artificialMouseMove() :
    window.cancelAnimationFrame(frameRequest);
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
  switch (e.key) {
    case tanksInfo.predator.key: predatorStacking(); break;
    case tanksInfo.octoTank.key: octoTankStacking(); break;
  }
};

const start = () => {
  mouseX = 0;
  mouseY = 0;
  frameRequest = 0;
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
