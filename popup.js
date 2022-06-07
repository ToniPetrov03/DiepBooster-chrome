const table = document.querySelector('table');

const TableElement = (tank, bulletReload, keyCode) => {
  const createTh = () => document.createElement('th');
  const th1 = createTh();
  const th2 = createTh();
  const th3 = createTh();
  const tr = document.createElement('tr');
  const select = document.createElement('select');
  const input = document.createElement('input');

  select.innerHTML = `
<option value="0">0</option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
<option value="6">6</option>
<option value="7">7</option>
`;
  select.value = bulletReload;

  input.size = 4;
  input.spellcheck = false;
  input.value = keyCode;

  th1.textContent = tank.charAt(0).toUpperCase() + tank.slice(1);
  th2.appendChild(select)
  th3.appendChild(input);
  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);

  const updateStorage = () =>
    chrome.storage.local.set({
      [tank]: {
        keyCode: input.value,
        bulletReload: select.value,
      }
    });

  select.onchange = updateStorage;
  input.onkeydown = (e) => {
    e.preventDefault();

    input.value = e.code;

    updateStorage()
  }

  return tr;
}

chrome.storage.local.get((result) => {
  for (const tank in result) {
    table.appendChild(TableElement(tank, result[tank].bulletReload, result[tank].keyCode));
  }
});
