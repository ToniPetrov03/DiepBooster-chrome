import { storage } from '../storageService.js';
import scriptsSwitch from './service/scriptsSwitch.js';
import getReloadSpeed from './service/getReloadSpeed.js';

import predatorStacking from './stackingBullets/predatorStacking.js';
import stacking135Degrees from './stackingBullets/stacking135Degrees.js';

let state = {};

const initialState = {
  mouseX: 0,
  mouseY: 0,
  frameRequest: 0,
  isTankStacking: false,
  isArtificialMouseMove: false,
};

const onKeyUp = (e) => {
  const { OCTO, FIGHTER, PREDATOR } = storage;

  switch (e.code) {
    case OCTO.keyCode: stacking135Degrees(state, getReloadSpeed('OCTO', OCTO.bulletReload)); break;
    case FIGHTER.keyCode: stacking135Degrees(state, getReloadSpeed('FIGHTER', FIGHTER.bulletReload)); break;
    case PREDATOR.keyCode: predatorStacking(getReloadSpeed('PREDATOR', PREDATOR.bulletReload)); break;
  }
};

const onMouseMove = (e) => {
  if (state.isTankStacking) {
    if (!state.isArtificialMouseMove) {
      e.stopPropagation();

      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
    }
  } else {
    state.mouseX = e.clientX;
    state.mouseY = e.clientY;
  }
};

const start = () => {
  state = initialState;
  document.addEventListener('keyup', onKeyUp);
  document.addEventListener('mousemove', onMouseMove, { capture: true, passive: false });
};

const stop = () => {
  window.cancelAnimationFrame(state.frameRequest);
  document.removeEventListener('keyup', onKeyUp);
  document.removeEventListener('mousemove', onMouseMove, true);
};

scriptsSwitch(start, stop);
