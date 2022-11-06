const initKeyEvent = (keyCode, ...events) => {
  const eventInitDict = {
    which: keyCode,
    keyCode: keyCode,
    key: String.fromCharCode(keyCode),
  };

  return () => events.forEach((event) => window.dispatchEvent(new KeyboardEvent(event, eventInitDict)));
};

export const spaceUp = initKeyEvent(32, 'keyup');
export const spaceDown = initKeyEvent(32, 'keydown');
export const pressE = initKeyEvent(69, 'keydown', 'keyup');
