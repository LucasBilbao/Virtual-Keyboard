class TextArea {
  constructor() {
    this.domElement = document.createElement('textarea');
    document.getElementById('wrapper').appendChild(this.domElement);
    this.domElement.setAttribute('placeholder', 'Type Here');
    this.domElement.classList.add('text-area');

    this.value = '';
    this.domElement.value = this.value;
    this.domElement.selectionStart = this.domElement.value.length;
    this.domElement.selectionEnd = this.domElement.value.length;
    this.position = this.domElement.value.length;

    this.domElement.focus();
  }

  insertText(text) {
    this.value = `${this.value.slice(0, this.position)}${text}${this.value.slice(this.position)}`;
    this.domElement.value = this.value;
    this.moveHorizontally(text.length);
  }

  move(direction) {
    if (direction === 'ArrowLeft') {
      this.moveHorizontally(-1);
    } else if (direction === 'ArrowUp') {
      this.moveVertically(-1);
    } else if (direction === 'ArrowRight') {
      this.moveHorizontally(1);
    } else if (direction === 'ArrowDown') {
      this.moveVertically(1);
    }
  }

  moveHorizontally(dir) {
    if (isNaN(dir)) {
      throw new Error('The value has to be a number');
    }

    this.updateCursor(this.position + dir);
  }

  moveVertically(dir) {
    if (isNaN(dir)) {
      throw new Error('The value has to be a number');
    }

    if (dir === -1) {
      this.moveVerticallyUp();
    } else {
      this.moveVerticallyDown();
    }
  }

  moveVerticallyUp() {
    const lastBreak = this.domElement.value.lastIndexOf(
      '\n',
      this.position - 1
    );
    if (lastBreak < 0) this.updateCursor(0);
    else {
      const offset = this.position - lastBreak;
      let prevBreak =
        this.domElement.value.lastIndexOf('\n', lastBreak - 1) + 1;
      console.log(prevBreak);

      // if (prevBreak < 0) prevBreak = 0;
      const newPos = prevBreak + Math.min(offset - 1, lastBreak - prevBreak);
      this.updateCursor(newPos);
    }
  }

  updateCursor(position) {
    this.position = position;
    this.domElement.selectionStart = this.position;
    this.domElement.selectionEnd = this.position;
  }
}

export default TextArea;
