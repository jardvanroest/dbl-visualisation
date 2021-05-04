export class Dataset {
  constructor(rawData) {
    this._rawData = rawData;
  }

  getRawData() {
    return this._rawData;
  }
}
