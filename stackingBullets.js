let mouseX, mouseY, frameRequest, isTankStacking, isArtificialMouseMove;

const Angle_45_Degrees = Math.PI * 45 / 180;
const Angle_90_Degrees = Math.PI * 90 / 180;
const Angle_135_Degrees = Math.PI * 135 / 180;

const canvas = document.getElementById('canvas');
const target = document.getElementById('aa_main');
const config = { attributes: true, attributeFilter: ['class'] };
const reloadStep = { octoTank: 20, fighter: 20, triangle: 20, predator: 120 };

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

const artificialMouseMove = (reloadMs, rotationAngle) => {
  isTankStacking = !isTankStacking;

  if (!isTankStacking) {
    return window.cancelAnimationFrame(frameRequest);
  }

  const movement = (x) => {
    const angle = Math.floor(x / reloadMs) % 2 ? rotationAngle : 0;

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

    frameRequest = window.requestAnimationFrame(movement);
  };

  movement(0);
};

const onMouseMove = (e) => {
  if (isTankStacking) {
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
    case tanksInfo.fighter.keyCode: artificialMouseMove(reloadSpeedMs('fighter'), Angle_90_Degrees); break;
    case tanksInfo.octoTank.keyCode: artificialMouseMove(reloadSpeedMs('octoTank'), Angle_45_Degrees); break;
    case tanksInfo.triangle.keyCode: artificialMouseMove(reloadSpeedMs('triangle'), Angle_135_Degrees); break;
  }
};

const start = () => {
  mouseX = 0;
  mouseY = 0;
  frameRequest = 0;
  isTankStacking = false;
  isArtificialMouseMove = false;

  document.addEventListener('keyup', onKeyUp);
  document.addEventListener('mousemove', onMouseMove, true);
};

const stop = () => {
  window.cancelAnimationFrame(frameRequest);
  document.removeEventListener('keyup', onKeyUp);
  document.removeEventListener('mousemove', onMouseMove, true);
};

const scriptSwitch = {
  'aa_holder': start,
  'aa_holder active': stop,
};

new MutationObserver(() => scriptSwitch[target.className]()).observe(target, config);
