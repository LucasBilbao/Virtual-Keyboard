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
    this.value = `${this.value.slice(
      0,
      this.position
    )}${text}${this.value.slice(this.position)}`;
    this.domElement.value = this.value;
    this.moveHorizontally(text.length);
    // console.log(
    // 	typeof this.value,
    // 	this.position,
    // 	this.value[this.position - 1]
    // );
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
      throw new Error('The value has to be a number to move vertically');
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
    if (lastBreak === -1) this.updateCursor(0);
    else {
      const offset = this.position - lastBreak;
      let prevBreak =
        this.domElement.value.lastIndexOf('\n', lastBreak - 1) + 1;

      const newPos = prevBreak + Math.min(offset - 1, lastBreak - prevBreak);
      this.updateCursor(newPos);
    }
  }

  moveVerticallyDown() {
    const followingBreak = this.value.indexOf('\n', this.position);
    if (followingBreak === -1) this.updateCursor(this.value.length);
    else {
      let lastBreak = this.value.lastIndexOf('\n', this.position - 1);
      if (lastBreak < 0) lastBreak = 0;
      const offset = this.position - lastBreak;
      let nextBreak = this.value.indexOf('\n', followingBreak + 1);
      if (nextBreak === -1) nextBreak = this.value.length;
      const newPos =
        followingBreak + Math.min(offset + 1, nextBreak - followingBreak);
      this.updateCursor(newPos);
    }
  }

  erase(action) {
    if (action === 'Backspace') this.backspace();
    if (action === 'Delete') this.delete();
  }

  backspace() {
    if (this.position !== 0) {
      this.value = `${this.value.slice(0, this.position - 1)}${this.value.slice(
        this.position
      )}`;
      this.domElement.value = this.value;
      this.moveHorizontally(-1);
    }
  }

  delete() {
    if (this.position !== this.value.length) {
      this.value = `${this.value.slice(0, this.position)}${this.value.slice(
        this.position + 1
      )}`;
      this.domElement.value = this.value;
      this.moveHorizontally(0);
    }
  }

  updateCursor(position) {
    let newPos = position;
    if (newPos > this.value.length) newPos = this.value.length;
    if (newPos < 0) newPos = 0;
    this.position = newPos;
    this.domElement.selectionStart = this.position;
    this.domElement.selectionEnd = this.position;
  }
}

export default TextArea;
