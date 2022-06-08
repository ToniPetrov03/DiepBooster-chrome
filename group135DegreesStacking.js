let mouseX, mouseY, frameRequest, isTankStacking, isArtificialMouseMove;

const group135DegreesStacking = (reloadSpeedMs) => {
  isTankStacking = !isTankStacking;

  if (!isTankStacking) {
    return window.cancelAnimationFrame(frameRequest);
  }

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const artificialMouseMove = (x) => {
    const angle = ((x / reloadSpeedMs) >> 0) % 2 ? Angle_135_Degrees : 0;

    const sine = Math.sin(angle);
    const cosine = Math.cos(angle);

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
