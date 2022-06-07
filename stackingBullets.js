let mouseX, mouseY, frameRequest, isTankStacking, isArtificialMouseMove;

const { PI, sin, cos } = Math;
const Angle_135_Degrees = PI * 135 / 180;

const canvas = document.getElementById('canvas');
const target = document.getElementById('aa_main');
const config = { attributes: true, attributeFilter: ['class'] };

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

const group135Stacking = (reloadSpeedMs) => {
  isTankStacking = !isTankStacking;

  if (!isTankStacking) {
    return window.cancelAnimationFrame(frameRequest);
  }

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const artificialMouseMove = (x) => {
    const angle = ((x / reloadSpeedMs) >> 0) % 2 ? Angle_135_Degrees : 0;

    const sine = sin(angle);
    const cosine = cos(angle);

    const diffX = mouseX - centerX;
    const diffY = mouseY - centerY;

    const clientX = cosine * diffX - sine * diffY + centerX;
    const clientY = sine * diffX + cosine * diffY + centerY;

    isArtificialMouseMove = true;
    canvas.dispatchEvent(new MouseEvent('mousemove', { clientX, clientY }));
    isArtificialMouseMove = false;

    frameRequest = window.requestAnimationFrame(artificialMouseMove);
  };

  artificialMouseMove();
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
    case tanksInfo.octo.keyCode: group135Stacking(tanksInfo.octo.reloadSpeedMs); break;
    case tanksInfo.triangle.keyCode: group135Stacking(tanksInfo.triangle.reloadSpeedMs); break;
    case tanksInfo.predator.keyCode: predatorStacking(tanksInfo.predator.reloadSpeedMs); break;
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
