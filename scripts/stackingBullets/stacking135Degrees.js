const { PI, sin, cos } = Math;
const ANGLE_135_DEGREES = PI * 135 / 180;

const canvas = document.getElementById('canvas');

const stacking135Degrees = (state, reloadSpeedMs) => {
  state.isTankStacking = !state.isTankStacking;

  if (!state.isTankStacking) {
    return window.cancelAnimationFrame(state.frameRequest);
  }

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const artificialMouseMove = (x) => {
    const angle = ((x / reloadSpeedMs) >> 0) % 2 ? ANGLE_135_DEGREES : 0;

    const sine = sin(angle);
    const cosine = cos(angle);

    const diffX = state.mouseX - centerX;
    const diffY = state.mouseY - centerY;

    const clientX = cosine * diffX - sine * diffY + centerX;
    const clientY = sine * diffX + cosine * diffY + centerY;

    state.isArtificialMouseMove = true;
    canvas.dispatchEvent(new MouseEvent('mousemove', { clientX, clientY }));
    state.isArtificialMouseMove = false;

    state.frameRequest = window.requestAnimationFrame(artificialMouseMove);
  };

  artificialMouseMove();
};

export default stacking135Degrees;
