import PROPS_ALIAS from './propsAlias.js';

export const createElement = (tagName, props, ...children) => {
  const element = document.createElement(tagName);

  for (const prop in props) {
    element[PROPS_ALIAS[prop] || prop] = props[prop];
  }

  for (const child of children) {
    element.appendChild(child);
  }

  return element;
}

export { createElement as c };
