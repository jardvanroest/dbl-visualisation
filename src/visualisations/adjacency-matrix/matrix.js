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

<<<<<<< HEAD
    this.persons.forEach((sender) => {
      const row = matrix[sender.id];
      if (row === undefined) matrix[sender.id] = {};

      this.persons.forEach((receiver) => {
        matrix[sender.id][receiver.id] = this._createCell(sender, receiver);
=======
    this.persons.forEach((recipient) => {
      const row = matrix[recipient.id];
      if (row === undefined) matrix[recipient.id] = {};

      this.persons.forEach((sender) => {
        matrix[recipient.id][sender.id] = this._createCell(sender, recipient);
>>>>>>> d63fabe80d49ce892a9b6086fc44c545c41a1ecb
      });
    });

    this.emails.forEach((email) => {
<<<<<<< HEAD
      const cell = matrix[email.fromId][email.toId];
=======
      const cell = matrix[email.toId][email.fromId];
>>>>>>> d63fabe80d49ce892a9b6086fc44c545c41a1ecb
      cell.addEmail(email);
    });

    matrix = this._convertToArrayOfArrays(matrix);

    return matrix;
  }

<<<<<<< HEAD
  _createCell(sender, receiver) {
    const cell = new Cell(sender, receiver);
=======
  _createCell(sender, recipient) {
    const cell = new Cell(sender, recipient);
>>>>>>> d63fabe80d49ce892a9b6086fc44c545c41a1ecb
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
<<<<<<< HEAD
  constructor(sender, receiver) {
    this.sender = sender;
    this.receiver = receiver;
=======
  constructor(sender, recipient) {
    this.sender = sender;
    this.recipient = recipient;
>>>>>>> d63fabe80d49ce892a9b6086fc44c545c41a1ecb
    this._emails = [];
  }

  addEmail(email) {
    this._emails.push(email);
  }

  get fillColor() {
    if (this._emails.length === 0) {
<<<<<<< HEAD
      return "#B8E0F6";
    } else {
      return "#DF848F";
=======
      return "#b8e0f6";
    } else {
      return "#df848f";
>>>>>>> d63fabe80d49ce892a9b6086fc44c545c41a1ecb
    }
  }

  get weight() {
    return this._emails.length;
  }
}
