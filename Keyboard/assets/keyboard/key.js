// eslint-disable-next-line import/extensions
import imported from './main.js';
// eslint-disable-next-line import/extensions
// import {refresh} from './main.js';

// Keyboard body div.keyboard
let keyboardLayout = document.createElement('div');
keyboardLayout.classList.add('keyboard');
document.body.appendChild(keyboardLayout);

// Keys div.keyboard_keys
let keysDiv = document.createElement('div');
keysDiv.classList.add('keyboard_keys');
keyboardLayout.appendChild(keysDiv);

const pressHold = new CustomEvent('pressHold');

class Key {
  static currentCase = 'lower';
  static currentLanguage = localStorage.getItem('language');
  static capsLockActive = false;
  static shiftActive = false;

  constructor(keyConfig) {
    this.config = keyConfig;
    this.createDOM();
    this.setDisplay();
    this.specialChars = {
      Space: ' ',
      Enter: '\n',
      Tab: '\t',
    };
    this.setEvent();
  }

  createDOM() {
    this.domElement = document.createElement('button');
    this.domElement.setAttribute('type', 'button');
    this.domElement.className = 'keyboard_key';
    if (
      this.config.id === 'Backspace' ||
      this.config.id === 'Tab' ||
      this.config.id === 'CapsLock' ||
      this.config.id === 'ShiftLeft'
    ) {
      this.domElement.classList.add('keyboard_key--wide');
    }
    if (this.config.id === 'Space') {
      this.domElement.classList.add('keyboard_key--extra-wide');
    }
    if (
      this.config.id === 'ArrowLeft' ||
      this.config.id === 'ArrowUp' ||
      this.config.id === 'ArrowRight' ||
      this.config.id === 'ArrowDown'
    ) {
      this.domElement.classList.add('keyboard_key--fixed');
    }
    if (this.config.id === 'CapsLock') {
      this.domElement.classList.add('keyboard_key--activatable');
    }
  }

  setDisplay() {
    // Line breaker <br>
    if (
      this.config.id === 'Tab' ||
      this.config.id === 'CapsLock' ||
      this.config.id === 'ShiftLeft' ||
      this.config.id === 'ControlLeft'
    ) {
      keysDiv.appendChild(document.createElement('br'));
    }

    if (
      this.config.id === 'Backspace' ||
      this.config.id === 'Tab' ||
      this.config.id === 'CapsLock' ||
      this.config.id === 'Enter' ||
      this.config.id === 'ShiftLeft' ||
      this.config.id === 'ShiftRight' ||
      this.config.id === 'Space' ||
      this.config.id === 'ArrowLeft' ||
      this.config.id === 'ArrowUp' ||
      this.config.id === 'ArrowRight' ||
      this.config.id === 'ArrowDown'
    ) {
      this.appendIcon(this.config.value.lower);
    } else {
      this.domElement.innerHTML =
        this.config.value[Key.currentLanguage][Key.currentCase];
    }
    keysDiv.appendChild(this.domElement);
  }

  appendIcon(name) {
    this.domElement.innerHTML = `<i class="material-icons">${name}</i>`;
  }

  setEvent() {
    if (this.config.id === 'ShiftLeft' || this.config.id === 'ShiftRight') {
      this.domElement.addEventListener('mousedown', () => {
        this.activate();
        this.releaseMouse();
      });
    } else {
      this.domElement.addEventListener('click', () => {
        if (
          this.config.id === 'Space' ||
          this.config.id === 'Enter' ||
          this.config.id === 'Tab'
        ) {
          imported.textArea.insertText(this.specialChars[this.config.id]);
        } else if (
          this.config.id === 'ControlLeft' ||
          this.config.id === 'ControlRight' ||
          this.config.id === 'AltLeft' ||
          this.config.id === 'AltRight' ||
          this.config.id === 'Backspace' ||
          this.config.id === 'Delete' ||
          this.config.id === 'Win'
        ) {
          return;
        } else if (this.config.id === 'CapsLock') {
          this.activate();
        } else if (
          this.config.id === 'ArrowRight' ||
          this.config.id === 'ArrowLeft' ||
          this.config.id === 'ArrowUp' ||
          this.config.id === 'ArrowDown'
        ) {
          imported.textArea.move(this.config.id.substring());
        } else {
          imported.textArea.insertText(this.domElement.innerHTML);
          // textArea.setCursor();
        }
      });
    }
  }

  releaseMouse() {
    document.addEventListener(
      'mouseup',
      () => {
        this.activate();
      },
      { once: true }
    );
  }

  activate() {
    if (!Key.capsLockActive && this.config.id === 'CapsLock') {
      this.domElement.classList.add('keyboard_key--active');
      Key.capsLockActive = !Key.capsLockActive;
      Key.currentCase = 'upper';
    } else if (this.config.id === 'CapsLock') {
      this.domElement.classList.remove('keyboard_key--active');
      Key.capsLockActive = !Key.capsLockActive;
      Key.currentCase = 'lower';
    } else if (!Key.shiftActive && this.config.id.substring(0, 5) === 'Shift') {
      Key.shiftActive = !Key.shiftActive;
      Key.currentCase = 'upper';
    } else if (this.config.id.substring(0, 5) === 'Shift') {
      Key.shiftActive = !Key.shiftActive;
      Key.currentCase = 'lower';
    }
    imported.refresh(this.config.id);
  }

  reset(caller) {
    if (this.config.hasSecondary) {
      if (caller.substring(0, 5) === 'Shift') {
        if (this.config.value[Key.currentLanguage].shiftSensitivity) {
          this.domElement.innerHTML =
            this.config.value[Key.currentLanguage][Key.currentCase];
        }
      } else {
        if (this.config.value[Key.currentLanguage].capsSensitivity) {
          this.domElement.innerHTML =
            this.config.value[Key.currentLanguage][Key.currentCase];
        }
      }
    }
  }
}

document.addEventListener('keydown', (e) => {
  if (e.altKey && e.ctrlKey) {
    if (Key.currentLanguage === 'en') {
      localStorage.setItem('language', 'ge');
    } else {
      localStorage.setItem('language', 'en');
    }
    Key.currentLanguage = localStorage.getItem('language');
    imported.refresh(e.code);
  }
});

document.addEventListener('keydown', (e) => {
  const key = imported.findElement(e.code);
  if (key) {
    e.preventDefault();
    key.domElement.classList.add('pressed');
    if (!e.ctrlKey) {
      key.domElement.click();
    }
    if (key.config.id.substring(0, 5) === 'Shift') {
      key.activate();
    }
  }
});

document.addEventListener('keyup', (e) => {
  const key = imported.findElement(e.code);
  if (key) {
    e.preventDefault();
    key.domElement.classList.remove('pressed');

    if (key.config.id.substring(0, 5) === 'Shift') {
      key.activate();
    }
  }
});

export default Key;
