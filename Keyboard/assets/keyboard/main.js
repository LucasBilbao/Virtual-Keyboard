// eslint-disable-next-line import/extensions
import keyboard from './keyboard.js';
// eslint-disable-next-line import/extensions
import TextArea from './text-area.js';
// eslint-disable-next-line import/extensions
import Key from './key.js';

if (!localStorage.getItem('language')) {
  localStorage.setItem('language', 'en');
}

const textArea = new TextArea();
const keys = keyboard.map((item) => new Key(item));

function refresh(name) {
  keys.forEach((item) => item.reset(name));
}

function findElement(find) {
  return keys.find((item) => {
    return item.config.id === find;
  });
}

export default { textArea, refresh, findElement };
