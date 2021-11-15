const oldGraphics = 'input.set_convar("ren_stroke_soft_color", false)';

const styling = (style) => {
  const script = document.createElement('script');
  script.innerHTML = style;

  document.body.appendChild(script);
  script.remove();
}

setTimeout(() => styling(oldGraphics), 1000);
