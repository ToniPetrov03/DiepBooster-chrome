const keyInputs = document.getElementsByTagName('input');
const reloadSelects = document.getElementsByTagName('select');

const [predatorKeyInput, octoTankKeyInput] = keyInputs;
const [predatorReloadSelect, octoTankReloadSelect] = reloadSelects;

chrome.storage.sync.get(['predator', 'octoTank'], ({ predator, octoTank }) => {
  predatorKeyInput.value = predator.key;
  predatorReloadSelect.value = predator.reload;
  octoTankKeyInput.value = octoTank.key;
  octoTankReloadSelect.value = octoTank.reload;
});

const onChange = ({ target }) => {
  const { name, value } = target;
  const [tank, prop] = name.split('-');

  chrome.storage.sync.get(tank, (result) => {
    chrome.storage.sync.set({
      [tank]: {
        ...result[tank],
        [prop]: value,
      },
    });
  });
}

[...keyInputs].forEach(input => input.addEventListener('input', onChange));

[...reloadSelects].forEach(select => select.addEventListener('change', onChange));
