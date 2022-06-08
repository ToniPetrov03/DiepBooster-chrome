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

const scriptSwitcher = {
  'aa_holder': start,
  'aa_holder active': stop,
};

new MutationObserver(() => scriptSwitcher[target.className]()).observe(target, config);
