const reloadStep = { predator: 120, group135: 20 };

const [...keyInputs] = document.querySelectorAll('input[spellcheck]');
const [...reloadSelects] = document.getElementsByTagName('select');

chrome.storage.local.get((result) => {
  [...keyInputs, ...reloadSelects].forEach(el => {
    const [tank, prop] = el.id.split('-');

    el.value = result[tank][prop];
  });
});

const onChange = (e) => {
  const { id, value } = e.target;
  const [tank, prop] = id.split('-');

  chrome.storage.local.get(tank, (result) => {
    result[tank][prop] = value;
    result[tank].reloadSpeedMs = (15 - result[tank].bulletReload) * reloadStep[tank];

    chrome.storage.local.set(result);
  });
};

keyInputs.forEach(input => {
  input.addEventListener('keydown', (e) => {
    e.preventDefault();

    input.value = e.code;

    onChange(e);
  });
});

reloadSelects.forEach(select => select.addEventListener('change', onChange));
