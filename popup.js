const keyInputs = document.getElementsByTagName('input');
const reloadSelects = document.getElementsByTagName('select');

const [predatorKeyInput, octoTankKeyInput] = keyInputs;
const [predatorReloadSelect, octoTankReloadSelect] = reloadSelects;

const responseWidth = el => el.value.length + 1 + 'ch';

chrome.storage.sync.get(['predator', 'octoTank'], ({ predator, octoTank }) => {
  predatorKeyInput.value = predator.keyCode;
  predatorReloadSelect.value = predator.reload;
  octoTankKeyInput.value = octoTank.keyCode;
  octoTankReloadSelect.value = octoTank.reload;

  predatorKeyInput.style.width = responseWidth(predatorKeyInput);
  octoTankKeyInput.style.width = responseWidth(predatorKeyInput);
});

const onChange = ({ target }) => {
  const { id, value } = target;
  const [tank, prop] = id.split('-');

  chrome.storage.sync.get(tank, (result) => {
    chrome.storage.sync.set({
      [tank]: {
        ...result[tank],
        [prop]: value,
      },
    });
  });
}

[...keyInputs].forEach(input => {
  const onKeyDown = (e) => {
    e.preventDefault();

    input.value = e.code;
    input.style.width = responseWidth(input);

    onChange(e);
  };

  input.addEventListener('focusin', () => document.addEventListener('keydown', onKeyDown));
  input.addEventListener('focusout', () => document.removeEventListener('keydown', onKeyDown));
});

[...reloadSelects].forEach(select => select.addEventListener('change', onChange));
