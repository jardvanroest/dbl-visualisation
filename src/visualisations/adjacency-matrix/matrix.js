export class Matrix {
  constructor(persons, colors, emails) {
    this.persons = persons;
    this.colors = colors;
    this.matrixData = this._createMatrixData(emails);
  }

  getMatrixData() {
    return this.matrixData;
  }

  _createMatrixData(emails) {
    let matrix = {};

    this.persons.forEach((recipient) => {
      const row = matrix[recipient.id];
      if (row === undefined) matrix[recipient.id] = {};

      this.persons.forEach((sender) => {
        matrix[recipient.id][sender.id] = this._createCell(sender, recipient);
      });
    });

    emails.forEach((email) => {
      let cell = matrix[email.toId][email.fromId];
      cell.addEmail(email);
    });

    matrix = this._convertToArrayOfArrays(matrix);

    return matrix;
  }

  _createCell(sender, recipient) {
    const cell = new Cell(sender, recipient);
    return cell;
  }

  _convertToArrayOfArrays(objectOfObjects) {
    const arrayOfObjects = Object.values(objectOfObjects);

    for (let i = 0; i < arrayOfObjects.length; i++) {
      arrayOfObjects[i] = Object.values(arrayOfObjects[i]);
    }

    return arrayOfObjects;
  }
}

class Cell {
  constructor(sender, recipient) {
    this.sender = sender;
    this.recipient = recipient;
    this._emails = [];

    this.x = 0;
    this.y = 0;
  }

  addEmail(email) {
    this._emails.push(email);
  }

  set coords({ x, y }) {
    this.x = x;
    this.y = y;
  }

  get fillColor() {
    if (this._emails.length !== 0) {
      return "#df848f";
    }
    return "#b8e0f6";
  }

  get weight() {
    return this._emails.length;
  }
}
