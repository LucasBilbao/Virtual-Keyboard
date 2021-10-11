class TextArea {
  constructor() {
    this.domElement = document.createElement('textarea');
    const temp = document.getElementById('wrapper');
    temp.appendChild(this.domElement);
    this.domElement.classList.add('text-area');

    this.domElement.value = '';
    this.position = 0;

    this.domElement.focus();
  }

  setCursorPosition(position) {
    this.domElement.focus();
    this.position = position;
    this.domElement.selectionStart = position;
    this.domElement.selectionEnd = position;
  }

  appendText(text) {
    // this.insertCharAt(text);
    this.domElement.value = `${this.domElement.value}${text}`;
  }

  // insertCharAt(char, position = 0) {
  //   const result = `${this.domElement.value.slice(
  //     0,
  //     position
  //   )}${char}${this.domElement.value.slice(position)}`;

  //   this.updateDisplay(result, this.position + 1);
  // }

  // updateDisplay(result, position) {
  //   this.domElement.value = result;

  //   this.setCursorPosition(position);
  // }

  // updateCursorDirection(direction) {
  //   if (direction === 'ArrowLeft') {
  //     moveVertically(-1);
  //   } else if (direction === 'ArrowUp') {
  //     moveHorizontally(-1);
  //   } else if (direction === 'ArrowRight') {
  //     moveVertically(1);
  //   } else if (direction === 'ArrowDown') {
  //     moveHorizontally(1);
  //   }
  // }

  // moveVertically(dir) {}
}

export default TextArea;
