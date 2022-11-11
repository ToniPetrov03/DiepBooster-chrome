import c from '../../../create/createElement.js';

import { setStorage } from '../../../storageService.js';

const tableItemStyles = `
  padding: 8px;
  position: relative;
  border: 1px solid #bbbbbb;
`;

const warningStyles = `
  top: 0px;
  right: 0px;
  margin: 2px;
  padding: 2px;
  color: black;
  position: absolute;
  background-color: gold;
`;

const inputStyles = `
  cursor: pointer;
  text-align: center;
  caret-color: transparent;
`;

const warningTanks = {
  OCTO: true,
  FIGHTER: true,
  PREDATOR: false,
};

const TableItem = (tank, storage) => {
  const { keyCode, bulletReload } = storage[tank];

  const onInputKeyDown = (e) => {
    e.preventDefault();

    e.target.value = e.code;

    setStorage({
      [tank]: {
        bulletReload,
        keyCode: e.code,
      },
    });
  };

  const onSelectChange = (e) => {
    setStorage({
      [tank]: {
        keyCode,
        bulletReload: +e.target.value,
      },
    });
  };

  return (
    c('tr', {},
      c('th', { t: tank, s: tableItemStyles },
         warningTanks[tank] && c('span', { t: '!', s: warningStyles, title: 'Possible report!' }),
      ),
      c('th', { s: tableItemStyles },
        c('select', { onchange: onSelectChange, s: 'cursor: pointer' },
          ...Array.from({ length: 8 }, (_, i) =>
            c('option', { t: i, v: i, selected: i === bulletReload })
          ),
        ),
      ),
      c('th', { s: tableItemStyles },
        c('input', {
          size: 9,
          v: keyCode,
          s: inputStyles,
          spellcheck: false,
          onkeydown: onInputKeyDown,
          },
        ),
      ),
    )
  )
};

export default TableItem;
