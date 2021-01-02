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

const inputContainer = document.getElementById('textInputContainer');
const observerConfig = { attributes: true };

function gameStartObserver() {
  const observer = new MutationObserver(([mutation], observer) => {
    if (mutation.target?.style.display === 'none') {
      document.addEventListener('keyup', onRUp);
      observer.disconnect();
      gameEndObserver();
    }
  });

  observer.observe(inputContainer, observerConfig);
}

function gameEndObserver() {
  const observer = new MutationObserver(([mutation], observer) => {
    if (mutation.target?.style.display === 'block') {
      document.removeEventListener('keyup', onRUp);
      observer.disconnect();
      gameStartObserver();
    }
  });

  observer.observe(inputContainer, observerConfig);
}

function onRUp(e) {
  if (e.code !== 'KeyR') return;

  const fire = (t, w) => {
    setTimeout(spaceDown, t * 1000);
    setTimeout(spaceUp, t * 1000 + w);
  }

  fire(0, 100);
  fire(0.75, 200);
  fire(1.5, 750);

  setTimeout(pressE, 2000);
}

gameStartObserver();
