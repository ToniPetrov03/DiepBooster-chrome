let mouseX = 0;
let mouseY = 0;
let interval = 0;
let isFire = false;

const SIN_45_DEGREES = Math.sqrt(2) / 2;

const canvas = document.getElementById('canvas');
const target = document.getElementById('a');
const config = { attributes: true, attributeFilter: ['style'] };
const display = { none: 'addEventListener', block: 'removeEventListener' };

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

// TODO Predator reload

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
  isFire = !isFire;

  pressE();

  const artificialMouseMove = () => {
    interval = setInterval(() => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const diffX = mouseX - centerX;
      const diffY = mouseY - centerY;

      const clientX = SIN_45_DEGREES * (diffX - diffY) + centerX;
      const clientY = SIN_45_DEGREES * (diffX + diffY) + centerY;

      canvas.dispatchEvent(new MouseEvent('mousemove', { clientX, clientY }));
    }, 300 - 20 * tanksInfo.octoTank.bulletReload);
  };

  isFire ? artificialMouseMove() : clearInterval(interval);
};

const onMouseMove = (e) => {
  //TODO Fix Bug

  mouseX = e.clientX;
  mouseY = e.clientY;
};

const onKeyUp = ({ code }) => {
  switch (code) {
    case tanksInfo.predator.keyCode: predatorStacking(); break;
    case tanksInfo.octoTank.keyCode: octoTankStacking(); break;
  }
};

new MutationObserver(() => {
  clearInterval(interval);
  isFire = false;

  document[display[target.style.display]]('keyup', onKeyUp);
}).observe(target, config);

canvas.addEventListener('mousemove', onMouseMove);
