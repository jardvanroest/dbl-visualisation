import store from "@/store";

export class Matrix {
  constructor(persons) {
    this.persons = persons;
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
        matrix[recipient.id][sender.id].addEmails(
          sender.sendEmails,
          recipient.id
        );
      });
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

  addEmails(emails, recipientId) {
    emails.forEach((email) => {
      if (email.toId === recipientId) this._addEmail(email);
    });
  }

  _addEmail(email) {
    this._emails.push(email);
  }

  get fillColor() {
    if (
      this.sender.isSelectedInEmailFilter ||
      this.recipient.isSelectedInEmailFilter ||
      !store.getters["dataset/thereAreAddressesSelectedInTheEmailFilter"]
    ) {
      if (this._emails.length !== 0) {
        return "#df848f";
      }
    }
    return "#b8e0f6";
  }

  get weight() {
    return this._emails.length;
  }
}
