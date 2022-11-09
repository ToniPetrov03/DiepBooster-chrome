import c from '../../../create/createElement.js';

import { setStorage } from '../../../storageService.js';

const tableItemStyles = `
  padding: 8px;
  border: 1px solid #bbbbbb;
`;

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
      c('th', { t: tank, s: tableItemStyles }),
      c('th', { s: tableItemStyles },
        c('select', { onchange: onSelectChange, s: 'cursor: pointer' },
          ...Array.from({ length: 8 }, (_, i) =>
            c('option', { t: i, v: i, selected: i === bulletReload })
          ),
        ),
      ),
      c('th', { style: tableItemStyles },
        c('input', {
          size: 9,
          v: keyCode,
          spellcheck: false,
          s: 'text-align: center',
          onkeydown: onInputKeyDown,
          },
        ),
      ),
    )
  )
};

export default TableItem;
