const keyInputs = document.getElementsByTagName('input');
const reloadSelects = document.getElementsByTagName('select');

const [predatorKeyInput, octoTankKeyInput] = keyInputs;
const [predatorReloadSelect, octoTankReloadSelect] = reloadSelects;

const responseInputsWidth = () => {
  const width = Math.max(predatorKeyInput.value.length, octoTankKeyInput.value.length) + 1 + 'ch';

  predatorKeyInput.style.width = width;
  octoTankKeyInput.style.width = width;
};

chrome.storage.local.get(['predator', 'octoTank'], ({ predator, octoTank }) => {
  predatorKeyInput.value = predator.keyCode;
  predatorReloadSelect.value = predator.reload;
  octoTankKeyInput.value = octoTank.keyCode;
  octoTankReloadSelect.value = octoTank.reload;

  responseInputsWidth();
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

    responseInputsWidth();
    onChange(e);
  });
});

[...reloadSelects].forEach(select => select.addEventListener('change', onChange));
