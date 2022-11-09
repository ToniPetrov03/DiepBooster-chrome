import c from '../create/createElement.js';

import Header from './components/Header/Header.js';
import Table from './components/Table/Table.js';

const body = document.querySelector('body');

const container = (
  c('div', {},
    Header,
    Table,
  )()
);

body.appendChild(container);
