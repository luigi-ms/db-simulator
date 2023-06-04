export default class Record {
  constructor(id) {
    this.name = "fulano";
    this.age = 0;
    this.id = id;
    this.updateCol = "";
  }

  static getColumns() {
    return ["id", "name", "age"];
  }

  getEmptyCol() {
    if (this.name === "") {
      return "name";
    } else if (this.age === 0) {
      return "age";
    }
  }

  static validateColumn(column) {
    const loweredCol = column.toLowerCase();
    if (Record.getColumns().some((col) => col === loweredCol)) {
      return loweredCol;
    } else {
      throw new Error(`column '${loweredCol}' does not exist`);
    }
  }
}
