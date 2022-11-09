import PROPS_ALIAS from './propsAlias.js';

const c = (tagName, props, ...children) => (
  () => {
    const element = document.createElement(tagName);

    for (const prop in props) {
      element[PROPS_ALIAS[prop] || prop] = props[prop];
    }

    for (const child of children) {
      if (child.then) {
        const placeholder = document.createElement('div');

        element.appendChild(placeholder);

        child.then((component) => placeholder.replaceWith(component()));
      } else {
        element.appendChild(child());
      }
    }

    return element;
  }
);

export default c;
