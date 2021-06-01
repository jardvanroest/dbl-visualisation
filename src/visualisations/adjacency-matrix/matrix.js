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

    this.persons.forEach((sender) => {
      const row = matrix[sender.id];
      if (row === undefined) matrix[sender.id] = {};

      this.persons.forEach((receiver) => {
        matrix[sender.id][receiver.id] = this._createCell(sender, receiver);
      });
    });

    this.emails.forEach((email) => {
      const cell = matrix[email.fromId][email.toId];
      cell.addEmail(email);
    });

    matrix = this._convertToArrayOfArrays(matrix);

    return matrix;
  }

  _createCell(sender, receiver) {
    const cell = new Cell(sender, receiver);
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
  constructor(sender, receiver) {
    this.sender = sender;
    this.receiver = receiver;
    this._emails = [];
  }

  addEmail(email) {
    this._emails.push(email);
  }

  get fillColor() {
    if (this._emails.length === 0) {
      return "#B8E0F6";
    } else {
      return "#DF848F";
    }
  }

  get weight() {
    return this._emails.length;
  }
}
