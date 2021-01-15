let mouseX = 0;
let mouseY = 0;
let interval = 0;
let isFire = false;

const initKeyEvent = (keyCode, ...events) => {
  const eventInitDict = {
    which: keyCode,
    keyCode: keyCode,
    key: String.fromCharCode(keyCode),
  };

  return () => events.forEach((event) => window.dispatchEvent(new KeyboardEvent(event, eventInitDict)));
};

const canvas = document.getElementById('canvas');

const pressE = initKeyEvent(69, 'keydown', 'keyup');
const spaceDown = initKeyEvent(32, 'keydown');
const spaceUp = initKeyEvent(32, 'keyup');

const sin45 = Math.sin(Math.PI / 4);

const predatorCode = 'KeyR';
const octoTankCode = 'KeyV';

// TODO Predator reload

const reload = 7;
const octoTankReloadMs = 300 - 20 * reload;

const predator = () => {
  const fire = (t, w) => {
    setTimeout(spaceDown, t * 1000);
    setTimeout(spaceUp, t * 1000 + w);
  }

  fire(0, 100);
  fire(0.75, 200);
  fire(1.5, 750);

  setTimeout(pressE, 2000);
};

const octoTank = () => {
  isFire = !isFire;

  if (isFire) {
    interval = setInterval(() => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const diffX = mouseX - centerX;
      const diffY = mouseY - centerY;

      const clientX = sin45 * (diffX - diffY) + centerX;
      const clientY = sin45 * (diffX + diffY) + centerY;

      canvas.dispatchEvent(new MouseEvent('mousemove', { clientX, clientY }));
    }, octoTankReloadMs);
  } else {
    clearInterval(interval);
  }

  pressE();
};

const onMouseMove = (e) => {
  //TODO Fix Bug

  mouseX = e.clientX;
  mouseY = e.clientY;
};

const codes = {
  [predatorCode]: predator,
  [octoTankCode]: octoTank,
};

const onKeyUp = ({ code }) => code in codes && codes[code]();

canvas.addEventListener('mousemove', onMouseMove);
document.addEventListener('keyup', onKeyUp);
