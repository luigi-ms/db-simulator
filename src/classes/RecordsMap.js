export default class RecordsMap {
  constructor() {
    this._recs = new Map();
    this._ids = new Set();
  }

  create(newID, newRec) {
    try {
      this.validateID(newID, true);
      this._recs.set(newID, newRec);
      this._ids.add(newID);
      this.updateStorage();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  read(recordID) {
    try {
      this.validateID(recordID);
      return this._recs.get(recordID);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  update(recordID, newRec) {
    try {
      this.validateID(recordID);
      this._recs.set(recordID, newRec);
      this.updateStorage();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  deleteRecord(recordID) {
    try {
      this.validateID(recordID);
      this._recs.delete(recordID);
      this.updateStorage();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  updateStorage() {
    window.localStorage.setItem(
      "records",
      JSON.stringify(Object.fromEntries(this._recs))
    );
    window.localStorage.setItem(
      "ids",
      JSON.stringify(Object.fromEntries(this._ids))
    );
  }

  retrieveData() {
    let db = window.localStorage.getItem("records");
    let ids = window.localStorage.getItem("ids");

    this._recs = new Map(Object.entries(JSON.parse(db)).map((it) => it));
    this._ids = new Map(Object.entries(JSON.parse(ids)).map((it) => it));
  }

  validateID(id, addingData = false) {
    if (addingData) {
      if (this._ids.has(id)) {
        throw new Error(`ID ${id} already exists`);
      }
    } else {
      if (!this._ids.has(id)) {
        throw new Error(`ID ${id} does not exist`);
      }
    }

    return id;
  }

  get list() {
    return Array.from(this._recs.values());
  }
}
