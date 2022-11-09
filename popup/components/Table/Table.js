import c from '../../../create/createElement.js';

import { storage } from '../../../storageService.js';

import TableItem from './TableItem.js';

const tableStyles = `
  width: 100%;
  border-collapse: collapse;
  border: 2px solid white;
`;

const tableHeadingStyles = `
  padding: 8px;
  border: 2px solid white;
  background-color: darkslategrey;
`;

const tableItemStyles = `
  padding: 8px;
  border: 1px solid #bbbbbb;
  background-color: black;
`;

const Table = (async () => {
  await storage;

  return (
    c('table', { s: tableStyles },
      c('thead', {},
        c('tr', {},
          c('th', { t: 'STACKING BULLETS', colSpan: 3, s: tableHeadingStyles }),
        ),
      ),
      c('tbody', {},
        c('tr', {},
          c('th', { t: 'TANK', s: tableItemStyles }),
          c('th', { t: 'RELOAD', s: tableItemStyles }),
          c('th', { t: 'KEYCODE', s: tableItemStyles }),
        ),
        TableItem('OCTO', storage),
        TableItem('FIGHTER', storage),
        TableItem('PREDATOR', storage),
      ),
    )
  )
})();

export default Table;
