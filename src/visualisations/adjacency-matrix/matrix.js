export class Matrix {
  constructor(persons, emails) {
    this.persons = persons;
    this.emails = emails;
    this.matrixData = this._createMatrixData();
  }

  getMatrixData() {
    return this.matrixData;
  }

  _createMatrixData() {
    let matrix = {};

    this.persons.forEach((recipient) => {
      const row = matrix[recipient.id];
      if (row === undefined) matrix[recipient.id] = {};

      this.persons.forEach((sender) => {
        matrix[recipient.id][sender.id] = this._createCell(sender, recipient);
      });
    });

    this.emails.forEach((email) => {
      const cell = matrix[email.toId][email.fromId];
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
  }

  addEmail(email) {
    this._emails.push(email);
  }

  get fillColor() {
    if (this._emails.length === 0) {
      return "#b8e0f6";
    } else {
      return "#df848f";
    }
  }

  get weight() {
    return this._emails.length;
  }
}
