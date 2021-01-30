const [...keyInputs] = document.getElementsByTagName('input');
const [...reloadSelects] = document.getElementsByTagName('select');

const responseWidth = (elements) => {
  const width = elements.reduce((acc, el) => Math.max(el.value.length, acc), 0) + 1 + 'ch';

  elements.forEach(el => el.style.width = width);
};

chrome.storage.local.get((result) => {
  [...keyInputs, ...reloadSelects].forEach(el => {
    const [tank, prop] = el.id.split('-');

    el.value = result[tank][prop];
  });

  responseWidth(keyInputs);
});

const onChange = ({ target }) => {
  const { id, value } = target;
  const [tank, prop] = id.split('-');

  chrome.storage.local.get(tank, (result) => {
    result[tank][prop] = value;

    chrome.storage.local.set(result);
  });
};

keyInputs.forEach(input => {
  input.addEventListener('keydown', (e) => {
    e.preventDefault();

    input.value = e.code;

    responseWidth(keyInputs);
    onChange(e);
  });
});

reloadSelects.forEach(select => select.addEventListener('change', onChange));
