import c from '../../../create/createElement.js'

const headerStyles = `
  display: flex;
  margin-bottom: 8px;
  align-items: center;
  justify-content: center;
  font-family: 'Trebuchet MS', sans-serif;
`;

const Header = (
  c('div', { s: headerStyles },
    c('img', { src: '../../images/booster128.png', alt: 'logo', width: 32 }),
    c('h2', { t: 'DiepBooster' }),
  )
);

export default Header;
