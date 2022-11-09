import c from '../../../create/createElement.js'

const headerStyles = `
  display: flex;
  margin-bottom: 8px;
  align-items: center;
  justify-content: center;
  font-family: 'Trebuchet MS', sans-serif;
`;

const imageStyles = `
  image-rendering: pixelated;
`;

const Header = (
  c('div', { s: headerStyles },
    c('img', { s: imageStyles, src: '../../images/booster32.png', alt: 'logo' }),
    c('h2', { t: 'DiepBooster' }),
  )
);

export default Header;
