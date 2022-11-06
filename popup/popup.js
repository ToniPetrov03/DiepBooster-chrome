import { c } from '../create/createElement.js';

import Table from './components/Table/Table.js';
import Header from './components/Header/Header.js';

const body = document.querySelector('body');

(async () => {
  const container = (
    c('div', {},
      Header,
      await Table,
    )
  );

  body.appendChild(container);
})();
