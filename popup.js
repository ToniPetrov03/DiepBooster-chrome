const keyInputs = document.getElementsByTagName('input');
const reloadSelects = document.getElementsByTagName('select');

const [predatorKeyInput, octoTankKeyInput] = keyInputs;
const [predatorReloadSelect, octoTankReloadSelect] = reloadSelects;

const responseInputsWidth = (...elements) => {
  const width = elements.reduce((acc, { value }) => value.length > acc ? value.length : acc, 0) + 1 + 'ch';

  elements.forEach(el => el.style.width = width);
};

chrome.storage.local.get(['predator', 'octoTank'], ({ predator, octoTank }) => {
  predatorKeyInput.value = predator.keyCode;
  predatorReloadSelect.value = predator.bulletReload;
  octoTankKeyInput.value = octoTank.keyCode;
  octoTankReloadSelect.value = octoTank.bulletReload;

  responseInputsWidth(predatorKeyInput, octoTankKeyInput);
});

const onChange = ({ target }) => {
  const { id, value } = target;
  const [tank, prop] = id.split('-');

  chrome.storage.local.get(tank, (result) => {
    chrome.storage.local.set({
      [tank]: {
        ...result[tank],
        [prop]: value,
      },
    });
  });
};

[...keyInputs].forEach(input => {
  input.addEventListener('keydown', (e) => {
    e.preventDefault();

    input.value = e.code;

    responseInputsWidth(predatorKeyInput, octoTankKeyInput);
    onChange(e);
  });
});

[...reloadSelects].forEach(select => select.addEventListener('change', onChange));
