export class Record {
  constructor(id){
    this.id = id;
    this.name = 'fulano';
    this.age = 0;
    this.updateCol = "";
  }

  static getColumns(){ return ['id', 'name', 'age']; }

  getEmptyCol(){
    if(this.name === ''){
      return 'name';
    }else if(this.age === 0){
      return 'age';
    }
  }

  static validateColumn(column){
    const loweredCol = column.toLowerCase();
    if(Record.getColumns().some(col => col === loweredCol)){
        return loweredCol;
    }else{
        throw new Error(`column '${loweredCol}' does not exist`);
    }
  }
}

export class RecordsList {
  constructor(){
    this._recs = [];
  }

  addRecord(rec){ 
    if(rec instanceof Record){
      this.list.push(rec);
      this.updateStorage();
    }else{
      throw new Error('Not a Record instance');
    }
  }

  getRecord(recordID){
    const result = this.list.filter(rec => rec.id === recordID)[0];

    if(result){
      return result;
    }else{
      throw new Error("Record does not exist");
    }
  }

  getRecordIndex(recordID){
    const index = this.list.findIndex(rec => rec.id === recordID);

    if(index >= 0){
      return index;
    }else{
      throw new Error("Record index does not exist");
    }
  }

  updateRecord(oldRecIndex, newRec){
    if(newRec instanceof Record){
      this.list.splice(oldRecIndex, 1, newRec);
      this.updateStorage();
    }else{ 
      throw new Error('Not a Record instance');
    }
  }

  deleteRecord(recordIndex){
    this.list.splice(recordIndex, 1);
    this.updateStorage();
  }

  updateStorage(){
    window.localStorage.setItem("records", JSON.stringify(this.list));
  }

  retrieveData(){
    this._recs = JSON.parse(window.localStorage.getItem("records"));
  }

  validateID(id, addingData=false){
    if(addingData){
      if(this.idExists(id)){
        throw new Error("ID already exists");
      }
    }else{
      if(!this.idExists(id)){
        throw new Error("ID does not exist");
      }
    }
    
    return id;
  }

  idExists(id){ return this.list.some(rec => rec.id === id); }

  get list(){ return this._recs; }
}
