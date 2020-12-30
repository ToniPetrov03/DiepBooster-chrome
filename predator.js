let smartFireOn = false;

const initKeyEvent = (keyCode, ...events) => {
  const eventInitDict = {
    which: keyCode,
    keyCode: keyCode,
    key: String.fromCharCode(keyCode)
  };

  return () => events.forEach((event) => window.dispatchEvent(new KeyboardEvent(event, eventInitDict)));
}

const pressE = initKeyEvent(69, 'keydown', 'keyup');
const spaceDown = initKeyEvent(32, 'keydown');
const spaceUp = initKeyEvent(32, 'keyup');

const canvas = document.getElementById('canvas');

const inputContainer = document.getElementById('textInputContainer');
const observerConfig = { attributes: true };

const onEPress = ({ code }) => code === 'KeyE' && (smartFireOn = !smartFireOn);

function gameStartObserver() {
  const observer = new MutationObserver(([mutation], observer) => {
    if (mutation.target?.style.display === 'none') {
      initListeners();
      observer.disconnect();
      gameEndObserver();
    }
  });

  observer.observe(inputContainer, observerConfig);
}

function gameEndObserver() {
  const observer = new MutationObserver(([mutation], observer) => {
    if (mutation.target?.style.display === 'block') {
      removeListeners();
      observer.disconnect();
      gameStartObserver();
    }
  });

  observer.observe(inputContainer, observerConfig);
}

function initListeners() {
  console.log('init listeners')

  document.addEventListener('keyup', onEPress);
  canvas.addEventListener('mouseup', onMiddleClick);
}

function onMiddleClick(e) {
  if (e.button !== 1) return;

  smartFireOn = !smartFireOn;

  if (!smartFireOn) {
    pressE();
    return;
  }

  const fire = (t, w) => {
    setTimeout(spaceDown, t * 1000);
    setTimeout(spaceUp, t * 1000 + w);
  }

  fire(0, 100);
  fire(0.75, 200);
  fire(1.5, 750);

  setTimeout(pressE, 2000);
}

function removeListeners() {
  console.log('remove listeners')

  document.removeEventListener('keyup', onEPress);
  canvas.removeEventListener('mouseup', onMiddleClick);
}

console.log('start program')
gameStartObserver();
