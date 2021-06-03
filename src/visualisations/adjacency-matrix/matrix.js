export class Matrix {
  constructor(personsRows, personsCols) {
    this.matrixData = this._createMatrixData(personsRows, personsCols);
  }

  getMatrixData() {
    return this.matrixData;
  }

  _createMatrixData(peopleRows, peopleCols) {
    let matrix = {};

    for (let i = 0; i < peopleRows.length; i++) {
      const recipient = peopleRows[i];
      const row = matrix[i];
      if (row === undefined) matrix[i] = {};

      for (let j = 0; j < peopleCols.length; j++) {
        const sender = peopleCols[j];
        matrix[i][j] = this._createCell(sender, recipient);
        matrix[i][j].addEmails(sender.sendEmails, recipient.id);
      }
    }

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
      this.recipient.isSelectedInEmailFilter
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
