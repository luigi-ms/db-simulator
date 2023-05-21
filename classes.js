export class Record {
  constructor(id){
    this.id = id;
    this.name = '';
    this.age = 0;
    this.updated = '';
  }

  getUpdatedCol(){ return this.updated; }

  getEmptyCol(){
    if(this.name === ''){
      return 'name';
    }else if(this.age === 0){
      return 'age';
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
    }else{ 
      throw new Error('Not a Record instance');
    }
  }

  idExists(id){ return this.list.some(rec => rec.id === id); }

  get list(){ return this._recs; }
}
